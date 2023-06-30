const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('login')
})

routes.use('/user', require('./user'));
routes.use('/quote', require('./quotes'));

module.exports = routes;