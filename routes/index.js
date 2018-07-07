const router = require('express').Router();
const api = require('../api');
const session = require('./session.js');

router.use('/api', api);
router.use('/session', session);

router.route('/home')
  .get((req,res) => {
    res.render('home');
  })

module.exports = router;