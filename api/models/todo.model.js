const mongoose = require('mongoose').set('debug', true);
const { todoSchema } = require('../schemas/todo.schema');

const ToDo = mongoose.model('ToDo', todoSchema, 'todos'); 
exports.ToDo = ToDo;