const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const formidable = require("express-form-data");

const axios = require('axios');

const PORT = process.env.PORT || 3000;

app.use(session({
    secret: 'ultra secret word',
    resave: true,
    saveUninitialized: true
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.send('Hola mundo');
});

app.use(express.static(path.join(__dirname,'/public');
app.use('/bulma', express.static(path.join(__dirname,'/node_modules/bulma/css');
app.use('/vue', express.static(path.join(__dirname, '/node_modules/vue/dist/')));

app.listen(PORT);