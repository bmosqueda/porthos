const General = require('./General.js');
/*
  +----------+--------------+------+-----+---------+----------------+
  | Field    | Type         | Null | Key | Default | Extra          |
  +----------+--------------+------+-----+---------+----------------+
  | id       | int(11)      | NO   | PRI | NULL    | auto_increment |
  | name     | varchar(100) | NO   |     | NULL    |                |
  | email    | varchar(100) | NO   |     | NULL    |                |
  | urlImage | varchar(500) | YES  |     | NULL    |                |
  | token    | varchar(700) | NO   |     | NULL    |                |
  | school   | varchar(100) | NO   |     | NULL    |                |
  | idArea   | int(11)      | NO   |     | NULL    |                |
  | info     | varchar(750) | YES  |     | NULL    |                |
  +----------+--------------+------+-----+---------+----------------+

*/

class User extends General {
  //All methods call getBySql defined on General model
  constructor(){
    super('users');
  }

  validate(user) {
    let props = ['name', 'email', 'school', 'idArea', 'info'];
    let error = false;
    for (var i = props.length - 1; i >= 0; i--)
      if(user[props[i]] == null)
        return false;

    return true;
  }

  create(user) {
    if(validate(user)) {
      let sql = 
        `INSERT INTO ${this.table} 
        (name, email, ${user.urlImage ? 'urlImage' : ''}, ${user.token ? 'token' : ''}, school, idArea, info)
        VALUES(:name, :email, ${user.urlImage ? ':urlImage' : ''}, ${user.token ? ':token' : ''}, :school, :idArea, :info)`;

      return this.getBySql(sql, user);
    }
    else
      throw {message: 'Required paramether not defined', code: 400};
  }

  update(user, id) {
    if(validate(user) && id) {
      let sql = 
        `UPDATE INTO ${this.table} 
        (name, email, ${user.urlImage ? 'urlImage' : ''}, ${user.token ? 'token' : ''}, school, idArea, info)
        VALUES(:name, :email, ${user.urlImage ? ':urlImage' : ''}, ${user.token ? ':token' : ''}, :school, :idArea, :info)
        WHERE id = :id`;

      user.id = id;
      return this.getBySql(sql, user);
    }
    else
      throw {message: 'Required paramether not defined', code: 400};
  }
}

module.exports = User;