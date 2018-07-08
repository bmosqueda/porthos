const userModel = require('./models/User.js');
const User = new userModel();

module.exports = async function(req, res, next) {
  const userEmpty = {
    id: '',
    name: '',
    urlImage:'/content/user.jpg'
  };
  console.log('Session middleware');
  if(!req.session.user_id) {
    console.log('no loggueado');
    res.locals = {user: userEmpty};
    next();
  }
  else {
    console.log('loggueado');
    try {
      req.session.user = await User.getById(req.session.user_id);
      
      res.locals = {user: req.session.user[0]};
      next();
    }
    catch(err) {
      console.log(err);
      next();
    }
  }
};