const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Quote Book API',
        description: 'CSE 341 project 2 API'
    },
    host: 'cse341-project2-aaronlamoreaux.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);