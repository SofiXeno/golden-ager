const mongoose = require('mongoose');


const taskTemplatesSchema = new mongoose.Schema({

    title: {type: String, required: true},
    description: {type: String, required: true},
    category_id: {type: mongoose.Schema.Types.ObjectID, required: true, default: "60983edb7cb3785fc858cc91"},
    time: {type: String, required: true},

});

const TaskTemplates = mongoose.model('task_templates', taskTemplatesSchema);

module.exports = TaskTemplates;