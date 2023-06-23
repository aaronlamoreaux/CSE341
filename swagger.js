const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My Contacts API',
        description: 'CSE 341 project1 API',
    },
    host: 'https://cse341-aaronlamoreaux.onrender.com',
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
    await import('./server.js')
});