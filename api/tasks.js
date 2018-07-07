const router = require('express').Router();
const taskModel = require('../models/Task');
const Task = new taskModel();

router.route('/user/:idUser')
  .get((req,res) => {
    res.json(Task.getAllByUser(req.params.idUser));
  })
  .post((req,res) => {
    try {
      Task.create(req.body, req.params.idUser);
    } catch (err) {
      res.status(400).json(err);
    }
  })

// id: id Task
router.route(':id/files')
  .get((req, res) => {
    res.send('Hola mundo');
  });