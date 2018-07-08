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

app.get('/1', (req, res) => {
  let carreras = ['Historia', 'Español', 'Geografía', 'Matemáticas', 'Inglés']
  for (var i = carreras.length - 1; i >= 0; i--) {
    let sql = "INSERT INTO areas (name, idSchoolLevel) VALUES(:carrera, 1)";
    General.getBySql(sql, {carrera: carreras[i]});
  }
  res.send('1');
});

app.get('/2', (req, res) => {
  let carreras = ['Historia', 'Español', 'Álgebra', 'Inglés', 'Computación', 'Ciencias naturales']
  for (var i = carreras.length - 1; i >= 0; i--) {
    let sql = "INSERT INTO areas (name, idSchoolLevel) VALUES(:carrera, 2)";
    General.getBySql(sql, {carrera: carreras[i]});
  }
  res.send('2');
});

app.get('/3', (req, res) => {
  let carreras = ['Literatura', 'Ética', 'Trigonometrá', 'Química', 'Historia'];
  for (var i = carreras.length - 1; i >= 0; i--) {
    let sql = "INSERT INTO areas (name, idSchoolLevel) VALUES(:carrera, 3)";
    General.getBySql(sql, {carrera: carreras[i]});
  }
  res.send('3');
});

app.get('/4', (req, res) => {
  let carreras = [
    "Ingeniería de software",
    "Arquitectura",
    "Diseño gráfico",
    "Contaduría",
    "Psicología",
    "Ingeniería en sistemas computacionales",
    "Filosofía",
    "Trabajo social",
    "Turismo",
    "Enfermería",
    "Nutrición",
    "Biología",
    "Física",
    "Derecho",
    "Economía"
  ];
  for (var i = carreras.length - 1; i >= 0; i--) {
    let sql = "INSERT INTO areas (name, idSchoolLevel) VALUES(:carrera, 4)";
    General.getBySql(sql, {carrera: carreras[i]});
  }
  res.send('4');
});

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