/**
 * Database Manager
 */

/* global appman: true */
const lodash = require('lodash');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

class DBManager {
	constructor() {
		this.models = {};
		const Op = Sequelize.Op;
		const operatorsAliases = {
			$eq: Op.eq,
			$ne: Op.ne,
			$gte: Op.gte,
			$gt: Op.gt,
			$lte: Op.lte,
			$lt: Op.lt,
			$not: Op.not,
			$in: Op.in,
			$notIn: Op.notIn,
			$is: Op.is,
			$like: Op.like,
			$notLike: Op.notLike,
			$iLike: Op.iLike,
			$notILike: Op.notILike,
			$regexp: Op.regexp,
			$notRegexp: Op.notRegexp,
			$iRegexp: Op.iRegexp,
			$notIRegexp: Op.notIRegexp,
			$between: Op.between,
			$notBetween: Op.notBetween,
			$overlap: Op.overlap,
			$contains: Op.contains,
			$contained: Op.contained,
			$adjacent: Op.adjacent,
			$strictLeft: Op.strictLeft,
			$strictRight: Op.strictRight,
			$noExtendRight: Op.noExtendRight,
			$noExtendLeft: Op.noExtendLeft,
			$and: Op.and,
			$or: Op.or,
			$any: Op.any,
			$all: Op.all,
			$values: Op.values,
			$col: Op.col
		};
		const {
			host,
			replicationHost,
			port,
			database,
			username,
			password,
			dialect,
			pool
		} = appman.config.environments.database;

		this.connector = new Sequelize({
			dialect,
			operatorsAliases,
			database,
			username,
			password,
			port,
			pool,
			replication: {
				read: [{
					host: replicationHost
				}],
				write: {
					host
				}
			},
			define: {
				charset: 'utf8mb4',
				collate: 'utf8mb4_unicode_ci'
			}
		});

		this.orm = Sequelize;

		// Setup all tables
		this.initTables();
	}

	initTables() {
		const dbModelFolderPath = path.join(__dirname, '/models');
		fs.readdirSync(dbModelFolderPath).forEach(filename => {
			const model = {};
			model.name = filename.replace(/\.[^/.]+$/, '');
			model.path = path.join(dbModelFolderPath, filename);
			console.log("model.path", this.connector);
			model.resource = this.connector.import(model.path);
			const modelName = lodash.replace(model.name, new RegExp('-', 'g'), '_');
			this.models[modelName] = model;
		});
		this.initAssociations();
	}

	initAssociations() {
		// Create model reference variable.
		// It make association definition more frienly.
		const users = this.models.users.resource;
		const roles = this.models.roles.resource;
		const resources = this.models.resources.resource;
		const permissions = this.models.permissions.resource;
		const users_roles = this.models.users_roles.resource;
		const roles_resources_permissions = this.models.roles_resources_permissions.resource;
		const company = this.models.company.resource;
		const investor = this.models.investor.resource;

		const round = this.models.round.resource;
		const round_investor = this.models.round_investor.resource;
		const round_company = this.models.round_company.resource;
		const industry = this.models.industry.resource;
		const industry_company = this.models.industry_company.resource;
		const area = this.models.area.resource;
		const area_company = this.models.area_company.resource;
		const person = this.models.person.resource;
		const education = this.models.education.resource;
		const career = this.models.career.resource;
		const person_company = this.models.person_company.resource;
		const acquisition = this.models.acquisition.resource;
		const acquisition_company = this.models.acquisition_company.resource;
		const shareholder = this.models.shareholder.resource;
		const shareholder_company = this.models.shareholder_company.resource;
		const article = this.models.article.resource;
		// Create the association
		// Ref: http://docs.sequelizejs.com/class/lib/associations/base.js~Association.html

		// users - users_roles - roles
		users.belongsToMany(roles, {
			as: 'roles',
			through: users_roles,
			foreignKey: 'userId'
		});
		roles.belongsToMany(users, {
			as: 'users',
			through: users_roles,
			foreignKey: 'roleId'
		});
		// roles - roles-resources-permissions
		roles.hasMany(roles_resources_permissions, {
			as: 'roleRRP',
			foreignKey: 'roleId'
		});
		roles_resources_permissions.belongsTo(roles, {
			as: 'role',
			foreignKey: 'roleId'
		});
		// resources - roles-resources-permissions
		resources.hasMany(roles_resources_permissions, {
			as: 'resourceRRP',
			foreignKey: 'resourceId'
		});
		roles_resources_permissions.belongsTo(resources, {
			as: 'resource',
			foreignKey: 'resourceId'
		});
		// resources - roles-resources-permissions
		permissions.hasMany(roles_resources_permissions, {
			as: 'permissionRRP',
			foreignKey: 'permissionId'
		});
		roles_resources_permissions.belongsTo(permissions, {
			as: 'permission',
			foreignKey: 'permissionId'
		});
		investor.hasOne(company, {
			as: 'company',
			foreignKey: 'investorId',
		});
		company.belongsTo(investor, {
			as: 'investor',
			foreignKey: 'investorId'
		});
		// round - investors	
		round.belongsToMany(investor, {
			as: 'investors',
			through: round_investor,
			foreignKey: 'roundId'
		});
		investor.belongsToMany(round, {
			as: 'rounds',
			through: round_investor,
			foreignKey: 'investorId'
		});
		// round - company

		company.belongsToMany(round, {
			as: 'rounds',
			through: round_company,
			foreignKey: 'companyId',
		});
		round.belongsToMany(company, {
			as: 'company',
			through: round_company,
			foreignKey: 'roundId'
		});


		// Companies - industries
		company.belongsToMany(industry, {
			as: 'industries',
			through: industry_company,
			foreignKey: 'companyId',
		});

		industry.belongsToMany(company, {
			as: 'company',
			through: industry_company,
			foreignKey: 'industryId',
		});
		// areas - companies
		company.belongsToMany(area, {
			as: 'areas',
			through: area_company,
			foreignKey: 'companyId',
		});

		area.belongsToMany(company, {
			as: 'company',
			through: area_company,
			foreignKey: 'areaId',
		});

		// persons - educations
		person.hasMany(education,{
			as:'educations',
			foreignKey: 'personId',
		});

		education.belongsTo(person,{
			as:'person',
			foreignKey: 'personId',
		});

		// persons - careers
		person.hasMany(career,{
			as:'careers',
			foreignKey: 'personId',
		});

		career.belongsTo(person,{
			as:'person',
			foreignKey: 'personId',
		});

		// person - company m-to-m
		person.belongsToMany(company, {
			as: 'company',
			through: person_company,
			foreignKey: 'personId',
		});

		company.belongsToMany(person, {
			as: 'person',
			through: person_company,
			foreignKey: 'companyId',
		});

		// Acquisition - Company m-to-m
		acquisition.belongsToMany(company, {
			as: 'company',
			through: acquisition_company,
			foreignKey: 'acquisitionId',
		});

		company.belongsToMany(acquisition, {
			as: 'acquisition',
			through: acquisition_company,
			foreignKey: 'companyId',
		});

		// Shareholder - Company many-to-many
		company.belongsToMany(shareholder, {
			as: 'shareholderCompo',
			through: shareholder_company,
			foreignKey: 'companyId',
		});
		shareholder.belongsToMany(company, {
			as: 'companies',
			through: shareholder_company,
			foreignKey: 'shareHolderId',
		});

		// company - shareholder one to many
		company.hasMany(shareholder, {
			as: 'shareholder',
			foreignKey: 'companyId',
		});
		shareholder.belongsTo(company, {
			as:'company',
			foreignKey: 'companyId',
		});

		// article - company many to one
		company.hasMany(article, {
			as:'article',
			foreignKey: 'companyId',
		});

		article.belongsTo(company,{
			as:'company',
			foreignKey: 'companyId',
		});
	}
}

module.exports = new DBManager();
