const General = require('./General.js');

class Catalog extends General {
  //All methods call getBySql defined on General model
  constructor(){
    super(''); 
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
    if(idSchoolLevel) {
      let sql = `SELECT * FROM areas WHERE idSchoolLevel = :idSchoolLevel`;

      return this.getBySql(sql, {idSchoolLevel: idSchoolLevel});
    }
    else
      throw {code: 400, message: 'idSchoolLevel not defined'};
  }

  getAreaAndLevelNameByIdArea(idArea) {
    if(idArea) {
      let sql = `SELECT areas.*, schoolLevel.name AS levelName FROM areas 
                INNER JOIN schoolLevel ON areas.idSchoolLevel = schoolLevel.id
                WHERE areas.id = :idArea`;

      return this.getBySql(sql, {idArea: idArea});
    }
    else
      throw {code: 400, message: 'idArea not defined'};
  }
}

module.exports = Catalog;