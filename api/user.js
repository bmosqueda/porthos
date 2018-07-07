const router = require('express').Router();
const userModel = require('../models/User');
const User = new userModel();

router.route('/')
  .post((req,res) => {
    try {
      res.json(User.create(req.body));
    } catch (err) {
      res.status(err.code).json({error: err.message});
    }
  })

router.route('/:id')
  .put((req,res) => {
    try {
      res.json(User.update(req.body, req.params.id)); // talvez podrias comparar que los id sean iguales, I dont know
    } catch (err) {
      res.status(err.code).json({error: err.message});
    }
  })

module.exports = router;