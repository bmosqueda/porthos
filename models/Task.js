const General = require('./General.js');
/*
+------------------+----------------+------+-----+-------------------+-----------------------------+
| Field            | Type           | Null | Key | Default           | Extra                       |
+------------------+----------------+------+-----+-------------------+-----------------------------+
| id               | int(11)        | NO   | PRI | NULL              | auto_increment              |
| idAuthor         | int(11)        | NO   |     | NULL              |                             |
| creationDate     | timestamp      | NO   |     | CURRENT_TIMESTAMP |                             |
| modificationDate | timestamp      | NO   |     | CURRENT_TIMESTAMP | on update CURRENT_TIMESTAMP |
| tags             | varchar(500)   | YES  |     | NULL              |                             |
| idSchoolLevel    | int(11)        | NO   |     | NULL              |                             |
| title            | varchar(200)   | NO   |     | NULL              |                             |
| idArea           | int(11)        | NO   |     | NULL              |                             |
| description      | varchar(10000) | NO   |     | NULL              |                             |
| stars            | int(11)        | YES  |     | 0                 |                             |
+------------------+----------------+------+-----+-------------------+-----------------------------+

*/

class Task extends General {
  //All methods call getBySql defined on General model
  constructor(){
    super('tasks');
  }

  getAllByUser(id) {
    let sql = `SELECT * FROM userTasks WHERE idUser = :idUser`;
    return this.getBySql(sql, {idUser: id});
  }

  validate() {
    let props = ['idSchoolLevel', 'title', 'school', 'idArea', 'description'];
    for (var i = props.length - 1; i >= 0; i--)
      if(user[props[i]] == null)
        return false;

    return true;
  }

  create(task, idUser) {
    return new Promise(async (resolve, reject) => {
      if(validate() && idUser) {
        let sql = 
          `INSERT INTO ${this.table} 
          (idAuthor, ${task.tags ? 'tags' : ''}, idSchoolLevel, title, idArea, description)
          VALUES(:idAuthor, ${task.tags ? ':tags' : ''}, :idSchoolLevel, title, idArea, description)`;
        task.idAuthor = idUser;

        try {
          //Save the task info
          let res = await this.getBySql(sql, task);
          let sql2 = `INSERT INTO userTasks (idTask, idUser) VALUES(:idTask, :idUser)`;
          let userTask = {idTask: res.info.insertId, idUser: idUser};

          //Save the record and relationship between user and this task
          let res2 = await this.getBySql(sql2, userTask);
          resolve(res);
        } catch(err) {
          //This already comes with json format
          reject(err);
        }
      }
      else
        reject({message: 'Required paramether not defined', code: 400});
    });
  }

  //**************File section
  validateFile() {
    let props = ['name', 'idTask', 'idAuthor', 'isOfAuthor'];
    for (var i = props.length - 1; i >= 0; i--)
      if(user[props[i]] == null)
        return false;

    return true;
  }

  saveFile() {
    if(validateFile()) {
      let sql =  
        `INSERT INTO taskFiles (name, idTask, idAuthor, isOfAuthor) 
        VALUES(:name, :idTask, :idAuthor, :isOfAuthor)`;

      return this.getBySql(sql, {idUser: id});
    }
    else
      throw {message: 'Required paramether not defined', code: 400};
  }
}
  
module.exports = Task;