const router = require('express').Router();

router.route('/home')
  .get((req,res) => {
    res.render('home')
  })

module.exports = router;