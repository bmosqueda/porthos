const users = require('express').Router();
const User = require('../models/User');

users.route('/')
  .post((req,res) => {
    const user = req.body;
    let badReq = false;
    ['name','email','token','school','idArea'].forEach(prop => {
      if (user[prop] == null)
        res.send()
    })
    User.create()
  })