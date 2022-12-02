const mongoose = require('mongoose');
const validator = require('validator');
const taskSchema = new mongoose.Schema({
title: {
    type: String,
    required: true,
    minlength: [2, 'Atleast 2 characters'],
    trim: true
},
_userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    unique: true,
    trim: true
},
WorkDescription: {
    type: String,
    required: true,
    maxlength: [45, 'Not more than 45 characters'],
},
Completed: {
    type: Boolean,
    required: true,
    trim: true,
    maxlength: 8
},
date: {
    type: Date,
    default: Date.now
}
})

module.exports= mongoose.model('Task', taskSchema);
