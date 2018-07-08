const router = require('express').Router();
const taskModel = require('../models/Task');
const Task = new taskModel();

router.get('/create', (req, res) => {
  res.render('task/create');
});

router.get('/view/:id', (req, res) => {
  const rgx = /^\d+$/;
  const t = new Task();
  if (rgx.test(req.params.id)) {
    t.getByIdAllInfo(req.params.id)
      .then(task => {
        t.getAllUserTask(req.params.id, task[0].idAuthor)
        .then(files => {
          task[0].files = files;
          console.log(task);
          res.render('task/view', { task: task[0] });
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