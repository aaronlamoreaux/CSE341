const express = require('express');
const routes = express.Router();

routes.use('/', require('./contacts'));

module.exports = routes;