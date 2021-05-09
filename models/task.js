const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    title: {type: String, required: true},
    description:{type: String, required: true},
    category_id:{type: String, required: true},
    time:{type: Timestamp, required: true},
    volunteer_id:{type: ObjectId, required: true},
    pensioner_id:{type: ObjectId, required: true}



});

const Tasks = mongoose.model('task', taskSchema);

module.exports = Tasks;