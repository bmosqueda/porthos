const General = require('./general.model.js');

class User extends General {
  constructor(){
    super('users');
  }


}

module.exports = User;