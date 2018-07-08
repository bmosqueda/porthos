const router = require('express').Router();
const taskModel = require('../models/Task');
const Task = new taskModel();

router.get('/create', (req, res) => {
  res.render('task/create');
});

router.get('/view/:id', (req, res) => {
  const rgx = /^\d+$/;
  if (rgx.test(req.params.id)) {
    Task.getByIdAllInfo(req.params.id)
      .then(task => {
        Task.getAllUserTask(req.params.id, task[0].idAuthor)
        .then(files => {
          task[0].files = files;
          console.log(task);
          console.log(req.session.user_id)
          console.log(req.session.user)
          const userEmpty = {
            id: '',
            name: '',
            urlImage:'https://www.iconspng.com/images/abstract-user-icon-3/abstract-user-icon-3.jpg'
          }
          const user = req.session.user_id != undefined ? req.session.user[0] : userEmpty;
          res.render('task/view', { task: task[0], user: user });
        })
        .catch(err => {
          res.status(500).json({err: err.message});
        });
      })
      .catch(err => {
        res.status(500).json({err: err.message});
      });
  } else
    res.status(400).json({err: "Invalid id"});
});

router.get('/result/level/:idLevel/area/:idArea', async (req, res) => {
  try {
    let tasks = await Task.getAllByLevelAndArea(req.params.idLevel, req.params.idArea);
    // res.render('task/searchsResult', tasks);
    res.json(tasks);
  }
  catch(err) {
    res.status(err.code).json({err: err.message});
  }
});

router.get('/result/text/:title', async (req, res) => {
  try {
    let tasks = await Task.getAllByTitle(req.params.title);
    // res.render('task/searchsResult', tasks);
    res.json(tasks);
  }
  catch(err) {
    res.status(err.code).json({err: err.message});
  }
});

router.get('/create', (req, res) => {
  res.render('task/create');
});

module.exports = router;