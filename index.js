const knex = require('./knex.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const formidable = require("express-form-data");
const axios = require('axios');
// Routers
const indexRouter = require('./routes/index');


//Models
const userModel = require('./models/User.js');
const User = new userModel();

const generalModel = require('./models/User.js');
const General = new generalModel();

const PORT = process.env.PORT || 3000;

app.set("view engine", "pug");

app.use(session({
    secret: 'ultra secret word :v',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.get('/', async (req, res) => {
  // let users = await knex('users').select('*');
  // let users = await User.getAll();
  let areas = await General.getBySql('SELECT * FROM areas');
  res.json(areas);
});

app.use(express.static(path.join(__dirname,'/public')));
app.use('/bulma', express.static(path.join(__dirname,'/node_modules/bulma/css')));
app.use('/vue', express.static(path.join(__dirname, '/node_modules/vue/dist/')));
app.use('/axios', express.static(path.join(__dirname, '/node_modules/axios')));

app.listen(PORT);