const api = require('express').Router();
const task = require('./task');
const user = require('./user');
const Catalog = require('./catalog');

api.use('/catalog', Catalog);
api.use('/user', user);
api.use('/task', task);

module.exports = api;