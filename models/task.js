const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({

    template_id: {type: mongoose.Schema.Types.ObjectID, ref:"task_templates", required: true},
    volunteer_id: {type: mongoose.Schema.Types.ObjectID, ref:"users", default: null, unique: true},
    pensioner_id: {type: mongoose.Schema.Types.ObjectID, ref:"users", required: true, unique: true},
    task_is_done: {type: Boolean, default: false}

});

const Tasks = mongoose.model('tasks', taskSchema);

module.exports = Tasks;