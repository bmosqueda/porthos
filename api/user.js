const users = require('express').Router();
const User = require('../models/User');
const user = new User();

users.route('/')
  .post((req,res) => {
    try {
      res.json(user.create(req.body));
    } catch (err) {
      res.status(400).json(err);
    }
  })

user.route('/:id')
  .put((req,res) => {
    try {
      res.json(user.update(req.body, req.params.id)); // talvez podrias comparar que los id sean iguales, I dont know
    } catch (err) {
      res.status(400).json(err);
    }
  })

