var express = require('express');
var router = express.Router();
const { ToDo } = require('../models/todo.model');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.get('/', (req, res) => {
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

router.post("/task", async (req, res) => {
  const task = await ToDo.create({
    title: req.body.title,
    description: req.body.description,
    is_done: req.body.is_done,
  });

  return res.status(200).json(task);
});

router.delete('/task/:id', async(req, res) => {
  const item = await ToDo.deleteOne({ _id: req.params.id });

  return res.status(200).json(item);
})

module.exports = router;
