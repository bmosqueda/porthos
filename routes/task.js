const router = require('express').Router();
const Task = require('../models/Task');

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

module.exports = router;