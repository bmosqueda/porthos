const api = require('express').Router();
const task = require('./task');
const user = require('./user');

api.use('/user', user);
api.use('/task', task);

module.exports = api;