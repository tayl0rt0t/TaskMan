const mongoose = require('mongoose');

const TaskItemSchema = new mongoose.Schema({
    item:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model('task',TaskItemSchema);

