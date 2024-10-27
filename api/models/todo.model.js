const mongoose = require('mongoose');
const { todoSchema } = require('../schemas/todo.schema');

const ToDo = mongoose.model('ToDo', todoSchema); 

exports.ToDo = ToDo;