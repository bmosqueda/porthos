const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const axios = require('axios');
const PORT = process.env.PORT || 3000;
global.PATH = path.resolve(__dirname);

// Routers
const indexRouter = require('./routes/index');

//Models
const userModel = require('./models/User.js');
const generalModel = require('./models/User.js');

const User = new userModel();
const General = new generalModel();
  
app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'ultra secret word :v',
    resave: true,
    saveUninitialized: true
}));

app.use('/', indexRouter);

/*app.get('/', async (req, res) => {
  let users = await User.getAll();
  // console.log(users);
  req.session.user_id = 1;
  req.session.save();
  // let areas = await General.getAllByTable('areas');
  res.json(users);
});

app.get('/otra', async (req, res) => {
  let users = await User.getAll();
  // console.log(users);
  if(req.session.user) {
    console.log(req.session.user);
  }
  // let areas = await General.getAllByTable('areas');
  res.send('Hola mundo');
});*/

app.use(express.static(path.join(__dirname,'/public')));
app.use('/bulma', express.static(path.join(__dirname,'/node_modules/bulma/css')));
app.use('/bulma-tagsinput', express.static(path.join(__dirname,'/node_modules/bulma-tagsinput/dist')));
app.use('/vuejs', express.static(path.join(__dirname, '/node_modules/vue/dist/')));
app.use('/axios', express.static(path.join(__dirname, '/node_modules/axios/dist')));
app.use('/CKEDITOR', express.static(path.join(__dirname, '/node_modules/@ckeditor/ckeditor5-build-classic/build')));
app.use('/bulma-carousel', express.static(path.join(__dirname,'/node_modules/bulma-extensions/bulma-carousel/dist')));
app.use('/tables', express.static(path.join(__dirname, '/node_modules/vue-tables-2/dist/')))
app.use('/fontawesome',express.static(path.join(__dirname, '/node_modules/@fortawesome/fontawesome-free/')))

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));