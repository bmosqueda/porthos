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
  | school   | varchar(100) | YES  |     | NULL    |                |
  | idArea   | int(11)      | YES  |     | NULL    |                |
  | info     | varchar(750) | YES  |     | NULL    |                |
  +----------+--------------+------+-----+---------+----------------+
*/

class User extends General {
  //All methods call getBySql defined on General model
  constructor(){
    super('users');
  }

  validate(user) {
    let props = ['name', 'email', 'token'];
    let error = false;
    for (var i = props.length - 1; i >= 0; i--)
      if(user[props[i]] == null)
        return false;

    return true;
  }

  create(user) {
    if(this.validate(user)) {
      let sql = 
        `INSERT INTO ${this.table} 
        (name, email, urlImage, token )
        VALUES(:name, :email, :urlImage, :token )`;
      console.log(sql);
      console.log(user);
      return this.getBySql(sql, user);
    }
    else
      throw {message: 'Required paramether not defined', code: 400};
  }

  update(user, id) {
    if(this.validate(user) && id) {
      let sql = 
        `UPDATE ${this.table} SET 
        name = :name, email = :email, ${user.urlImage ? 'urlImage = :urlImage' : ''}, 
        ${user.token ? 'token = :token' : ''}, school = :school, idArea = :idArea, info = :info 
        WHERE id = :id`;

      user.id = id;
      return this.getBySql(sql, user);
    }
    else
      throw {message: 'Required paramether not defined', code: 400};
  }

  getByEmail(email) {
    if(email) {
      let sql = `SELECT * FROM users WHERE email = :email`;

      return this.getBySql(sql, {email: email});
    }
    else
      throw {message: 'Required paramether not defined', code: 400};
  }
}

module.exports = User;