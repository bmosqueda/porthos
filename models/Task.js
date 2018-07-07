const General = require('./general.model.js');

class Task extends General {
  constructor(){
    super('tasks');
  }
}

module.exports = Task;