const knex = require('./knex.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const formidable = require("express-form-data");
const axios = require('axios');

//Models
const userModel = require('./models/User.js');
const User = new userModel();

const PORT = process.env.PORT || 3000;

app.set("view engine", "pug");

app.use(session({
    secret: 'ultra secret word :v',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', async (req, res) => {
  // let users = await knex('users').select('*');
  let users = await User.getAll();
  res.json(users);
});

app.use(express.static(path.join(__dirname,'/public')));
app.use('/bulma', express.static(path.join(__dirname,'/node_modules/bulma/css')));
app.use('/vue', express.static(path.join(__dirname, '/node_modules/vue/dist/')));
app.use('/axios', express.static(path.join(__dirname, '/node_modules/axios')));

app.listen(PORT);