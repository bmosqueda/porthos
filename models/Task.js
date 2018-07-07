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

  //**************Task
  getAllByUser(id) {
    let sql = `SELECT * FROM tasks WHERE idAuthor = :idUser`;
    return this.getBySql(sql, {idUser: id});
  }

  getAllInfoByUser(id) {
    const sql = `SELECT tasks.*, users.name, users.email FROM tasks INNER JOIN users ON tasks.idAuthor = users.id WHERE idAuthor = :idUser`;
    return this.getBySql(sql, {idUser: id});
  }

  validate(user) {
    let props = ['idSchoolLevel', 'title', 'idArea', 'description'];
    for (var i = props.length - 1; i >= 0; i--)
      if(user[props[i]] == null)
        return false;

    return true;
  }

  create(task, idUser) {
    return new Promise(async (resolve, reject) => {
      if(this.validate(task) && idUser) {
        let sql = 
          `INSERT INTO ${this.table} 
          (idAuthor, ${task.tags ? 'tags' : ''}, idSchoolLevel, title, idArea, description)
          VALUES(:idAuthor, ${task.tags ? ':tags' : ''}, :idSchoolLevel, :title, :idArea, :description)`;
        task.idAuthor = idUser;

        let res = await this.getBySql(sql, task);
        task.id = res.info.insertId;
        resolve(task);
        /*try {
          //Save the task info
          let sql2 = `INSERT INTO userTasks (idTask, idUser) VALUES(:idTask, :idUser)`;
          let userTask = {idTask: res.info.insertId, idUser: idUser};

          //Save the record and relationship between user and this task
          await this.getBySql(sql2, userTask);
          
        } catch(err) {
          //This already comes with json format
          reject(err);
        }*/
      }
      else
        reject({message: 'Required paramether not defined', code: 400});
    });
  }
  
  update(task, id) {
    if(this.validate(task) && id) {
      let sql = 
        `UPDATE INTO ${this.table} 
        (${task.tags ? 'tags = :tags' : ''}, idSchoolLevel = :idSchoolLevel, 
        title = :title, idArea = :idArea, description = :description)
        WHERE id = :id`;

      task.id = id;
      return this.getBySql(sql, task);
    }
    else
      throw {message: 'Required paramether not defined', code: 400};
  }

  getByIdAllInfo(id) {
    if(id) {
      let sql = 
        `SELECT ${this.table}.*, users.name AS author, users.email FROM ${this.table} 
        INNER JOIN users ON ${this.table}.idAuthor = users.id
        WHERE ${this.table}.id = :id`;

      return this.getBySql(sql, {id: id});
    }
    else
      throw {message: 'Required paramether not defined', code: 400};
  }

  //**************Comments
/*
  +----------+----------------+------+-----+---------+----------------+
  | Field    | Type           | Null | Key | Default | Extra          |
  +----------+----------------+------+-----+---------+----------------+
  | id       | int(11)        | NO   | PRI | NULL    | auto_increment |
  | idAuthor | int(11)        | NO   |     | NULL    |                |
  | idTask   | int(11)        | NO   |     | NULL    |                |
  | content  | varchar(10000) | NO   |     | NULL    |                |
  +----------+----------------+------+-----+---------+----------------+
*/
  saveComment(content, idUser, idTask) {
    if(content && idUser && idTask) {
      let sql = 
        `INSERT INTO comments (idTask, idUser, content)
        VALUES(:idTask, :idUser, :content)`;
      let comment = {
        idUser: idUser,
        idTask: idTask,
        content: content,
      };

      return this.getBySql(sql, comment);
    }
    else
      throw {message: 'Required paramether not defined', code: 400};
  }

  deleteComment(id) {
    if(id) {
      let sql = `DELETE FROM comments WHERE id = :id`;

      return this.getBySql(sql, {id: id});
    }
    else
      throw {message: 'Required paramether not defined', code: 400};
  }

  getAllCommentsByTask(id) {
    let sql = `SELECT * FROM comments WHERE idTask = :idTask`;

    return this.getBySql(sql, {idTask: id});
  }


  //**************File section
/*
  +------------+--------------+------+-----+---------+----------------+
  | Field      | Type         | Null | Key | Default | Extra          |
  +------------+--------------+------+-----+---------+----------------+
  | id         | int(11)      | NO   | PRI | NULL    | auto_increment |
  | idTask     | int(11)      | NO   |     | NULL    |                |
  | idAuthor   | int(11)      | NO   |     | NULL    |                |
  | isOfAuthor | tinyint(1)   | NO   |     | 0       |                |
  | name       | varchar(200) | NO   |     | NULL    |                |
  +------------+--------------+------+-----+---------+----------------+
*/
  validateFile(file) {
    let props = ['name', 'idTask', 'idAuthor', 'isOfAuthor'];
    for (var i = props.length - 1; i >= 0; i--)
      if(file[props[i]] == null)
        return false;
    return true;
  }

  saveFile(file) {
    if(this.validateFile(file)) {
      let sql =  
        `INSERT INTO taskFiles (name, idTask, idAuthor, isOfAuthor) 
        VALUES(:name, :idTask, :idAuthor, :isOfAuthor)`;

      return this.getBySql(sql, file);
    }
    else
      throw {message: 'Required paramether not defined', code: 400};
  }

  isOfAuthor(idTask, idUser) {
    let sql = `SELECT COUNT(*) FROM ${this.table} WHERE idAuthor = :idUser AND id = :idTask`;

    return this.getBySql(sql, {idUser: idUser, idTask: idTask});
  }

  getAllUserTask(task, user) {
    const sql = `SELECT name, isOfAuthor FROM taskFiles WHERE idAuthor = :user AND idTask = :task`
    return this.getBySql(sql, {user: user, task: task});
  }
}
module.exports = Task;