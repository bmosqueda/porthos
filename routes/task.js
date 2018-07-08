const router = require('express').Router();
const taskModel = require('../models/Task');
const catalogModel = require('../models/Catalog');
const Task = new taskModel();
const Catalog = new catalogModel();

router.get('/create', (req, res) => {
  res.render('task/create');
});

router.get('/edit/:id', async (req, res) => {
  let task = await Task.getByIdAllInfo(req.params.id);
  if(task[0]) {
    // if(task[0].idAuthor == req.session.user_id)    else 403
    res.render('task/edit', {task: task[0]});
  }
  else {
    res.sendStatus(404);
  }
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

router.get('/search/level/:idLevel/area/:idArea', async (req, res) => {
  try {
    let tasks = await Task.getAllByLevelAndArea(req.params.idLevel, req.params.idArea);
    let area = await Catalog.getAreaAndLevelNameByIdArea(req.params.idArea);
    res.render(
      'task/searchsResult', 
      {
        tasks: tasks, 
        search: `${area[0].name} en ${area[0].levelName}`
      });
  }
  catch(err) {
    console.log(err);
    res.status(err.code).json({err: err.message});
  }
});

router.get('/search/text/:title', async (req, res) => {
  try {
    let tasks = await Task.getAllByTitle(req.params.title);

    res.render('task/searchsResult', {tasks: tasks, search: req.params.title});
  }
  catch(err) {
    res.status(err.code).json({err: err.message});
  }
});

router.get('/create', (req, res) => {
  res.render('task/create');
});

module.exports = router;