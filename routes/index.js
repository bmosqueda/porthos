const router = require('express').Router();
const api = require('../api');
const session = require('./session.js');
const task = require('./task.js');
const Task = require('../models/Task');
const sessionMiddleware = require('../session-middleware');

router.use('/api', api);
router.use('/session', session);
router.use('/task', task);

router.use('/api', sessionMiddleware);
router.use('/session', sessionMiddleware);
router.use('/task', sessionMiddleware);
router.use('/home', sessionMiddleware);

router.get('/', (req, res) => {
  res.render('index');
});

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