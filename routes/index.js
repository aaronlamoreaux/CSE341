const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');
 
routes.get('/', lesson1Controller.homeroute);
routes.get('/anotherperson', lesson1Controller.brotherroute);

module.exports = routes;