require('dotenv').config();
var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./app/swagger/doc');
const {
	serverLogger
} = require('./app/core/logging/logger');

const routes = require("./app/utilities/router")
/** Init express app */
const app = express();
const server = require('http').createServer(app);

app.use(bodyParser.json())
/** Init 'appman' - global application manager */
global.appman = {};
/** Init response manager */
const responseUtil = require('./app/utilities/response');
global.appman.response = responseUtil;

/** Init database manager */
const database = require('./app/core/database/models');
global.appman.db = database;


/** Setup app */
app.use(serverLogger);
app.use(cors());
app.use(cookieParser());

// api-swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', routes);

const runTimeConfig = {
	launchedAt: Date.now(),
	appPath: process.cwd(),
	appVersion: process.env.VERSION,
	host: process.env.SERVER_HOST,
	port: process.env.SERVER_PORT,
	environment: process.env.NODE_ENV,
};

server.listen(runTimeConfig.port, (error) => {
	if (error) {
		console.log('⚠️ Server wasn\'t able to start properly.');
		console.error(err);
		return;
	}
	console.log('=========================================================');
	console.info('Time: ' + new Date());
	console.info('Launched in: ' + (Date.now() - runTimeConfig.launchedAt) + ' ms');
	console.info('Environment: ' + runTimeConfig.environment);
	console.info('Process PID: ' + process.pid);
	console.info('App path: ' + runTimeConfig.appPath);
	console.info('App version: ' + runTimeConfig.appVersion);
	console.info('To shut down your server, press <CTRL> + C at any time');
	console.log('=========================================================');
	console.info(`⚡️ Server: ${runTimeConfig.host}:${runTimeConfig.port}`);
	console.log('=========================================================');
	console.log('Example app listening on port 4000!');
});