const userModel = require('./models/User.js');
const User = new userModel();

module.exports = async function(req, res, next) {
  console.log('Session middleware');
  if(!req.session.user_id) {
    next();
  }
  else {
    try {
      req.session.user = await User.getById(req.session.user_id);
      next();
    }
    catch(err) {
      console.log(err);
      next();
    }
  }
};