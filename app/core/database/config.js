require('dotenv').config();
'use strict';
/**
 * Config model
 */
module.exports = {
	development: {
		username: process.env.DATABASE_USERNAME ,
		password: process.env.DATABASE_PASSWORD ,
		database: process.env.DATABASE_NAME ,
		host: process.env.DATABASE_HOST ,
		port: process.env.DATABASE_PORT ,
		dialect: process.env.DATABASE_DIALECT ,
		logging: console.log
	},
	beta: {
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
		host: process.env.DATABASE_HOST,
		port: process.env.DATABASE_PORT,
		dialect: process.env.DATABASE_DIALECT,
		logging: console.log
	},
	staging: {
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
		host: process.env.DATABASE_HOST,
		port: process.env.DATABASE_PORT,
		dialect: process.env.DATABASE_DIALECT,
		logging: console.log
	},
	production: {
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
		host: process.env.DATABASE_HOST,
		port: process.env.DATABASE_PORT,
		dialect: process.env.DATABASE_DIALECT,
		logging: console.log
	}
};
