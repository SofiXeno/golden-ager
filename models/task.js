const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    template_id: {type: ObjectId, required: true},

    volunteer_id: {type: ObjectId, required: true, default: null},
    pensioner_id: {type: ObjectId, required: true},
    task_is_done: {type: Boolean, required: true, default: false}

});

const Tasks = mongoose.model('tasks', taskSchema);

module.exports = Tasks;