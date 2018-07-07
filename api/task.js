const router = require('express').Router();
const formidable = require("express-form-data");
const mv = require('mv')

const taskModel = require('../models/Task');
const Task = new taskModel();

router.use(formidable.parse({keepExtensions: true}));

router.route('/user/:idUser')
  .get(async (req,res) => {
    try {
      res.json(await Task.getAllByUser(req.params.idUser));
    } catch (err) {
      res.status(err.code).json({error: err.message});
    }
  })
  .post(async (req,res) => {
    try {
      //Id object returned has id
      let task = await Task.create(req.body, req.params.idUser);
      res.status(201).json(task);
    } catch (err) {
      res.status(err.code).json({error: err.message});
    }
  });

router.route('/:id')
  .put(async (req, res) => {
    try {
      await Task.update(req.body, req.params.id);
      res.sendStatus(200);
    } catch (err) {
      res.status(err.code).json({error: err.message});
    }    
  });

router.route('/comment/:id')
  .delete(async (req, res) => {
    try {
      let result = await Task.deleteComment(req.params.id);
      res.sendStatus(result.info.affectedRows > 0 ? 204 : 400);
    } catch (err) {
      res.status(err.code).json({error: err.message});
    } 
  });

router.route('/comment/task/:idTask')
  .get(async (req, res) => {
    try {
      res.json(await Task.getAllCommentsByTask(req.params.idTask));
    } catch (err) {
      res.status(err.code).json({error: err.message});
    } 
  });

router.route('/comment/user/:idUser/task/:idTask')
  .post(async (req, res) => {
    try {
      let result = await Task.saveComment(req.body, req.params.idUser, req.params.idTask);

      res.status(201).json({id: result.info.insertId});
    } catch (err) {
      res.status(err.code).json({error: err.message});
    } 
  });

// id: id Task
router.route('/file/task/:idTask')
  .post(async (req, res) => {
      //Save the file in our public folder
      console.log(req.files.file.size);
      let extension = req.files.file.name.split(".").pop();
      let now = (new Date()).toISOString();
      // let isOfAuthor = await Task.isOfAuthor(idTask, idUser);
      let isOfAuthor = 1;

      let file = {
        name: `${now}_${idTask}.${extension}`,
        idTask: req.params.idTask,
        idAuthor: req.params.idAuthor,
        isOfAuthor: isOfAuthor
      };
      console.log(path.join(path.resolve(__dirname),`public/files/${name}`));
      mv(req.files.file.path, 
        path.join(path.resolve(__dirname),`public/files/${name}`), 
        async (err) => {
          if(err) {
            console.error(err.message);
            res.status(500).json(err);
          }
          else {
            console.log('else');

            try {
              console.log(file);
              let result = await Task.saveFile(file);
              file.id = result.info.insertId;
              res.status(201).json(file);
            }
            catch(err) {
              res.status(err.code).json({error: err.message});
            }
          }
        });
    // res.send('Hola mundo');
  });

module.exports = router;