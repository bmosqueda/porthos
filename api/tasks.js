const tasks = require('express').Router();
const Task = require('../models/Task');
const task = new Task();

tasks.route('/user/:idUser')
  .get((req,res) => {
    res.json(task.getAllByUser(req.params.idUser));
  })
  .post((req,res) => {
    try {
      task.create(req.body, req.params.idUser);
    } catch (err) {
      res.status(400).json(err);
    }
  })

// id: id Task
tasks.route(':id/files')
  .get