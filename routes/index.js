const router = require('express').Router();
const api = require('../api');
const session = require('./session.js');
const task = require('./task.js');
const Task = require('../models/Task');
const sessionMiddleware = require('../session-middleware');

router.use('/api', sessionMiddleware);
router.use('/session', sessionMiddleware);
router.use('/task', sessionMiddleware);
router.use('/home', sessionMiddleware);

router.use('/api', api);
router.use('/session', session);
router.use('/task', task);


router.get('/', (req, res) => {
  res.render('index');
});

router.route('/:userId')
  .get((req,res) => {
    if (req.session.user_id == req.params.userId) {
      let tasks = null;
      new Task().getAllInfoByUser(1)
        .then(data => {
          const userEmpty = {
            id: '',
            name: '',
            urlImage:'https://www.iconspng.com/images/abstract-user-icon-3/abstract-user-icon-3.jpg'
          }
          const user = req.session.user_id != undefined ? req.session.user[0] : userEmpty;
          res.render('home', { tasks: data, user: user });
        })
        .catch(err => res.status(500).send(err));
    }
  })

module.exports = router;