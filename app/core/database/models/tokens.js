'use strict'
const { Model, DataTypes } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Tokens extends Model {
		static associate(models) {
			Tokens.belongsTo(models.Users, {
				as: "user",
				foreignKey: 'userId'
			})
		}
	}
	Tokens.init({
		userId: DataTypes.INTEGER,
		token: DataTypes.STRING,
		refreshToken: DataTypes.STRING,
	}, {
		sequelize,
		modelName: 'Tokens',
		timestamps: true,
		paranoid: true
	});
	return Tokens
}