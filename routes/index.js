const router = require('express').Router();
const api = require('../api');
const session = require('./session.js');
const Task = require('../models/Task');

router.use('/api', api);
router.use('/session', session);

router.route('/home')
  .get((req,res) => {
    let tasks = null;
    new Task().getAllInfoByUser(1)
      .then(data => {
        res.render('home', { tasks: data });
      })
      .catch(err => res.status(500).send(err));
  })

module.exports = router;