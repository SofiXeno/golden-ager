const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    title: {type: String, required: true},
    description:{type: String, required: true},
    category_id:{type: ObjectId, required: true, default: "60983edb7cb3785fc858cc91"},
    time:{type: Timestamp, required: true},


    volunteer_id:{type: ObjectId, required: true},
    pensioner_id:{type: ObjectId, required: true},
    task_is_done : {type: Boolean, required: true, default: false}

});

const Tasks = mongoose.model('tasks', taskSchema);

module.exports = Tasks;