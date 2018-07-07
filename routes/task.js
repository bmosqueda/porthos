const router = require('express').Router();

router.get('/create', (req, res) => {
  res.render('task/create');
});

module.exports = router;