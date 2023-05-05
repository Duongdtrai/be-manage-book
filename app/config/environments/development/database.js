module.exports = {
	host: process.env.DATABASE_HOST,
	replicationHost: process.env.DATABASE_REPLICATION_HOST || process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	database: process.env.DATABASE_NAME,
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	dialect: process.env.DATABASE_DIALECT,
	pool: {
		max: Number(process.env.DATABASE_POOL_MAX),
		min: Number(process.env.DATABASE_POOL_MIN),
		acquire: process.env.DATABASE_POOL_ACQUIRE,
		idle: process.env.DATABASE_POOL_IDLE
	}
};
