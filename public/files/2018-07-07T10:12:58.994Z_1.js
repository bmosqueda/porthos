const General = require('./General.js');

class Catalog extends General {
  //All methods call getBySql defined on General model
  constructor(tableName){
    super(tableName);
  }

/*
  *********schoolLevel section sólo requiere getAll
  +-------+--------------+------+-----+---------+----------------+
  | Field | Type         | Null | Key | Default | Extra          |
  +-------+--------------+------+-----+---------+----------------+
  | id    | int(11)      | NO   | PRI | NULL    | auto_increment |
  | name  | varchar(100) | NO   |     | NULL    |                |
  +-------+--------------+------+-----+---------+----------------+
  
  *********Areas section sólo requiere getBySchoolLevel
  +---------------+--------------+------+-----+---------+----------------+
  | Field         | Type         | Null | Key | Default | Extra          |
  +---------------+--------------+------+-----+---------+----------------+
  | id            | int(11)      | NO   | PRI | NULL    | auto_increment |
  | name          | varchar(100) | NO   |     | NULL    |                |
  | idSchoolLevel | int(11)      | NO   |     | NULL    |                |
  +---------------+--------------+------+-----+---------+----------------+
*/
  getBySchoolLevel(idSchoolLevel) {
    let sql = `SELECT * FROM areas WHERE idSchoolLevel = :idLevel`;

    return this.getBySql(sql, {idLevel: idSchoolLevel});
  }
}

module.exports = Catalog;