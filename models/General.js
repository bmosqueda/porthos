const mariasql = require('mariasql-promise');
const db = new mariasql();

if(process.env.JAWSDB_URL) {
  //Heroku deployment
  db.connect(process.env.JAWSDB_URL);
} 
else {
  db.connect({
    host: '127.0.0.1',
    user: 'porthos',
    password: 'ninguna',
    db: 'porthosDB'
  }).then(() => {console.log("Conectado")})
    .catch((err) => {console.error("Error: ", err)});
}

class General {
  constructor(table) {
    this.table = table;
  }

  getBySql(sqlStmt, params = {}) {
    return new Promise((resolve, reject) => {
      //Protect of sql injection
      let sql = db.prepare(sqlStmt);
      //Excecute query
      db.query(sql(params))
        .then(rows => {
          resolve(rows);
        })
        .catch(err => {
          reject({message: err.message, code: 500});
        });
    });
  };

  getById(id) {
    let sql = `SELECT * FROM ${this.table} WHERE id = :id`;
    
    return this.getBySql(sql, {id: id});
  };

  getAll() {
    let sql = `SELECT * FROM ${this.table}`;

    return this.getBySql(sql);
  };

  deleteById(id) {
    let sql = `DELETE FROM ${this.table} WHERE id = :id`;

    return this.getBySql(sql, {id: id});
  };
}

module.exports = General;