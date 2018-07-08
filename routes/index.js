const router = require('express').Router();
const api = require('../api');
const session = require('./session.js');
const task = require('./task.js');
const TaskModel = require('../models/Task');
const UserModel = require('../models/User');
const Task = new TaskModel();
const User = new UserModel();
const sessionMiddleware = require('../session-middleware');

router.use('/api', sessionMiddleware);
router.use('/session', sessionMiddleware);
router.use('/task', sessionMiddleware);
router.use('/home', sessionMiddleware);

router.use('/api', api);
router.use('/session', session);
router.use('/task', task);

const userEmpty = {
  id: '',
  name: '',
  urlImage:'/content/user.jpg'
}

router.get('/', async (req, res) => {
  try {
    let user = await User.getById(req.session.user_id)[0];
    res.render('index', { user: user || userEmpty });
  } catch (err) {
    res.render('index', { user: userEmpty });
  }
});

router.route('/:userId')
  .get(async (req,res) => {
    if (req.session.user_id == req.params.userId) {
      try {
        try {
          const user = await User.getById(req.session.user_id)[0];
          res.render('home', { tasks: Task.getAllInfoByUser(1), user: user || userEmpty });
        } catch (err) {
          res.render('home', { tasks: Task.getAllInfoByUser(1), user: userEmpty });
        }
      } catch(err) {
        res.status(500).send(err);
      }
    }
  })

module.exports = router;