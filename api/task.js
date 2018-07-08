const router = require('express').Router();
const formidable = require("express-form-data");
const mv = require('mv');
const path = require('path');

const taskModel = require('../models/Task');
const Task = new taskModel();

router.use(formidable.parse({keepExtensions: true}));

router.route('/')
  .post(async (req,res) => {
    try {
      if(req.session.user_id) {
        //Id object returned has id
        let task = await Task.create(req.body, req.session.user_id);
        res.status(201).json(task);
      }
      else
        res.sendStatus(401);
    } catch (err) {
      res.status(err.code).json({error: err.message});
    }
  });

router.route('/user/:idUser')
  .get(async (req,res) => {
    try {
      res.json(await Task.getAllByUser(req.params.idUser));
    } catch (err) {
      res.status(err.code).json({error: err.message});
    }
  })

router.route('/:id')
  .get(async (req, res) => {
    try {
      let task = await Task.getById(req.params.id);
      if(task[0])
        res.json(task[0]);
      else
        res.sendStatus(404);
    } catch (err) {
      res.status(err.code).json({error: err.message});
    }    
  })
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
router.route('/file/:idTask')
  .get(async (req, res) => {
    try {
      let files = await Task.getAllFilesByTask(req.params.idTask);
      if(files[0])
        res.json(files[0]);
      else
        res.sendStatus(404);
    } catch (err) {
      res.status(err.code).json({error: err.message});
    }    
  })
  .post(async (req, res) => {
    if(req.session.user_id) {
      if(req.files.file.size <= 10485760) {
        let extension = req.files.file.name.split(".").pop();
        let now = (new Date()).toISOString();
        let name = `${now}_${req.params.idTask}.${extension}`;
        let isOfAuthor = await Task.isOfAuthor(req.params.idTask, req.session.user_id);

        let file = {
          name: name,
          idTask: req.params.idTask,
          idAuthor: req.session.user_id,
          isOfAuthor: Number(isOfAuthor[0]['COUNT(*)'])
        };

        //Save the file in our public folder
        mv(req.files.file.path, path.join(PATH,`public/files/${name}`), async (err) => {
          if(err) {
            console.error(err.message);
            res.status(500).json(err);
          }
          else {
            try {
              let result = await Task.saveFile(file);
              file.id = result.info.insertId;
              res.status(201).json(file);
            }
            catch(err) {
              res.status(err.code).json({error: err.message});
            }
          }
        });
      }
    }
    else
      res.sendStatus(401);
  });

module.exports = router;