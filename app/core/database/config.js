require('dotenv').config();
'use strict';
/**
 * Config model
 */

module.exports = {
	development: {
		username: process.env.DATABASE_USERNAME || 'root',
		password: process.env.DATABASE_PASSWORD || "pvSRLiZtWfqwkScANGst",
		database: process.env.DATABASE_NAME || "railway",
		host: process.env.DATABASE_HOST || "containers-us-west-56.railway.app",
		port: process.env.DATABASE_PORT || 6253,
		dialect: process.env.DATABASE_DIALECT || "mysql",
		logging: console.log
	},
	beta: {
		username: process.env.DATABASE_USERNAME || 'root',
		password: process.env.DATABASE_PASSWORD || "pvSRLiZtWfqwkScANGst",
		database: process.env.DATABASE_NAME || "railway",
		host: process.env.DATABASE_HOST || "containers-us-west-56.railway.app",
		port: process.env.DATABASE_PORT || 6253,
		dialect: process.env.DATABASE_DIALECT || "mysql",
		logging: console.log
	},
	staging: {
		username: process.env.DATABASE_USERNAME || 'root',
		password: process.env.DATABASE_PASSWORD || "pvSRLiZtWfqwkScANGst",
		database: process.env.DATABASE_NAME || "railway",
		host: process.env.DATABASE_HOST || "containers-us-west-56.railway.app",
		port: process.env.DATABASE_PORT || 6253,
		dialect: process.env.DATABASE_DIALECT || "mysql",
		logging: console.log
	},
	production: {
		username: process.env.DATABASE_USERNAME || 'root',
		password: process.env.DATABASE_PASSWORD || "pvSRLiZtWfqwkScANGst",
		database: process.env.DATABASE_NAME || "railway",
		host: process.env.DATABASE_HOST || "containers-us-west-56.railway.app",
		port: process.env.DATABASE_PORT || 6253,
		dialect: process.env.DATABASE_DIALECT || "mysql",
		logging: console.log
	}
};
