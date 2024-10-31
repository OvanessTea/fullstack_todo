const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    _id: String,
    title: {
        type: String,
        required: true,
    },
    description: String,
    is_done: Boolean,
    __v: Number,
});

exports.todoSchema = todoSchema