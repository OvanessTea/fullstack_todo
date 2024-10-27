const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    is_done: Boolean,
});

exports.todoSchema = todoSchema