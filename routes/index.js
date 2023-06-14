const routes = require('express').Router();
const lesson1Controller = require('../controllers');
 
routes.get('/', lesson1Controller.homeroute);
routes.get('/anotherperson', lesson1Controller.anotherpersonroute);

module.exports = routes;