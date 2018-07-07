const router = require('express').Router();
const api = require('../api');

router.use('/api', api);

router.route('/home')
  .get((req,res) => {
    res.render('home');
  })

module.exports = router;