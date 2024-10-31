var express = require('express');
var router = express.Router();
const { ToDo } = require('../models/todo.model');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.get('/tasks', (req, res) => {
  ToDo.find({})
    .then((found) => {
      console.log(found)
      if (found) {
        res.send(found);
      }
      // console.log(err);
      res.send("Some error occured!")
    }).catch(err => console.log("Error occured, " + err));
});

router.get('/tasks/:id', (req, res) => {
  ToDo.findById(req.body.id)
    .then((found) => {
      console.log(found)
      if (found) {
        res.send(found);
      }
      // console.log(err);
      res.send("Some error occured!")
    }).catch(err => console.log("Error occured, " + err));
});

router.post("/tasks", async (req, res) => {
  const task = await ToDo.create({
    title: req.body.title,
    description: req.body.description,
    is_done: req.body.is_done,
  });

  return res.status(200).json(task);
});

router.put('/tasks/:id', async (req, res) => {
  const task = await ToDo.put({
    _id: req.body._id,
    title: req.body.title,
    description: req.body.description,
    is_done: req.body.is_done,
  });

  return res.status(200).json(task);
})

router.delete('/tasks/:id', async (req, res) => {
  const item = await ToDo.deleteOne({ _id: req.params.id });

  return res.status(200).json(item);
})

module.exports = router;
