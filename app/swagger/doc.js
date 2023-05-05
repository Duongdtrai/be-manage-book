const swaggerJsDoc = require('swagger-jsdoc');
const swaggerDefinition = {
    info: {
        title: 'API LIBRARY BOOK',
        version: '1.0.0',
        description: 'This is the REST API for project LIBRARY BOOK',
    },
    host: process.env.API_HOST,
    basePath: '/api',
    tags: [
        {
            name: 'User',
            description: 'Api User',
        },
        {
            name: 'Book',
            description: 'Api Book',
        },
    ],
    securityDefinitions: {
        Bearer: {
            type: 'apiKey',
            schema: 'bearer',
            name: 'Authorization',
            in: 'header',
            prefix: 'Bearer ',
        },
    },
    definitions: {},
};

const options = {
    swaggerDefinition,
    explorer: true,
    apis: ['./app/**/*.js'],
};

module.exports = swaggerJsDoc(options);
