const express = require('express');
const routes = express.Router();

routes.use('/user', require('./user'));
routes.use('/quote', require('./quotes'));

module.exports = routes;