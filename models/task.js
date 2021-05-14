

const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({

    template_id: {type: mongoose.Schema.Types.ObjectID, required: true},

    volunteer_id: {type: mongoose.Schema.Types.ObjectID, required: true, default: null},
    pensioner_id: {type: mongoose.Schema.Types.ObjectID, required: true},
    task_is_done: {type: Boolean, required: true, default: false}

});

const Tasks = mongoose.model('tasks', taskSchema);

module.exports = Tasks;