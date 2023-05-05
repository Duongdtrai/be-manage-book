module.exports = {
	environment: process.env.NODE_ENV,
	host: process.env.SERVER_HOST,
	port: process.env.SERVER_PORT,
	redis: {
		database: process.env.REDIS_DATABASE,
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT
	},
	mongodb: {
		host: process.env.MONGODB_HOST,
		database: process.env.MONGODB_NAME,
		user: process.env.MONGODB_USER,
		pass: process.env.MONGODB_PASSWORD,
		poolSize: process.env.MONGODB_POOLSIZE || 5,
	},
	token: {
		privateKey: process.env.TOKEN_PRIVATE_KEY,
		expiresIn: Number(process.env.TOKEN_EXPIRES_IN) || 300
	},
	refreshToken: {
		privateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
		expiresIn: Number(process.env.REFRESH_TOKEN_EXPIRES_IN) || 300
	},
	aws: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
	},
	s3: {
		bucket: process.env.S3_BUCKET,
		url: process.env.S3_URL,
		apiVersion: process.env.S3_API_VERSION,
		folder: {
			default: {
				thumbnail: 'default/thumbnail'
			},
			user: {
				thumbnail: 'user/thumbnail'
			},
			company: {
				thumbnail: 'company/thumbnail'
			},
		}
	},
	ses: {
		apiVersion: process.env.SES_API_VERSION,
		emailAddress: process.env.SES_EMAIL,
		region: process.env.SES_REGION,
	},
};
