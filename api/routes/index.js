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

module.exports = router;
