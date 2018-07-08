const session = require('express').Router();
const axios = require('axios');
const userModel = require('../models/User.js');
const User = new userModel();

session.post('/fb/:token',(req,res) => {
  const token = req.params.token;
  console.log(token)
  url = `https://graph.facebook.com/me?access_token=${token}`
  console.log(url)
  axios.get(`https://graph.facebook.com/me?access_token=${token}`)
    .then(async ({data}) => {
      try {
        let isUserStored = await User.getByEmail(data.email);
        if(isUserStored[0]) {
          req.session.user_id = isUserStored[0].id;
          req.session.save();
          res.json(isUserStored[0]);
        }
        else {
          let user = {
            name: data.name,
            email: data.email,
            urlImage: data.picture.url,
            token: token,
          };
          let result = await User.create(user);
          if(result) {
            //Iniciar la sesión
            req.session.user_id = result.info.insertId;
            req.session.save();
            user.id = result.info.insertId;
            res.json(user);
          }
          else
            res.sendStatus(500);
        }
      }
      catch(err) {
        console.log(err);
        res.status(err.code).json({err: err.message});
      }
    })
    .catch(err => { //Error al conectarse o el token enviado no es válido
      console.log(err.message);
      res.sendStatus(400);
    });
})

session.post('/google', (req, res) => {
  const token = req.body.idToken;
  //Verify the token with google servers
  axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`)
    .then(async ({data}) => {
      /*
        Si entra aquí es porque el token es correcto
        {
          'aud': this app client id,
          'name': 'Brandon',
          'picture': 'url',
          'email': 'bmosqueda@ucol.mx',
          'email_verified': true,
          'sub': idCliente (use instead of email (because this can change)) 
        }
      */
      try {
        let isUserStored = await User.getByEmail(data.email);

        if(isUserStored[0]) {
          req.session.user_id = isUserStored[0].id;
          req.session.save();
          res.json(isUserStored[0]);
        }
        else {
          let user = {
            name: data.name,
            email: data.email,
            urlImage: data.picture,
            token: token,
          };

          let result = await User.create(user);

          if(result) {
            //Iniciar la sesión
            req.session.user_id = result.info.insertId;
            req.session.save();
            user.id = result.info.insertId;
            res.json(user);
          }
          else
            res.sendStatus(500);
        }
      }
      catch(err) {
        console.log(err);
        res.status(err.code).json({err: err.message});
      }
    })
    .catch(err => { //Erro al conectarse o el token enviado no es válido
      console.log(err.message);
      res.sendStatus(400);
    });
});

session.post('/logout', (req, res) => {
  req.session.destroy();
  req.session = null;

  res.sendStatus(200);
  // res.clearCookie('session', { path: '/' }).status(200).redirect("/");
});

module.exports = session;