const router = require('express').Router();
const catalogModel = require('../models/Catalog');
const Catalog = new catalogModel();

router.get('/areas', async (req, res) => {
  try { 
    let areas = await Catalog.getAllByTable('areas');

    res.json(areas);
  }
  catch(err) {
    console.log(err);
    res.status(err.code).json({error: err.message});
  }
});

router.get('/levels', async (req, res) => {
  try { 
    let levels = await Catalog.getAllByTable('schoolLevel');

    res.json(levels);
  }
  catch(err) {
    console.log(err);
    res.status(err.code).json({error: err.message});
  }
});

module.exports = router;