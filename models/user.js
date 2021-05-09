const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    user_type: {type: String, required: true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    birthday: {type: Date, required: true},
    organization: {type: String, required: false},
    is_free: {type: String, required: false}


});

userSchema.pre('save', function () {
    if (this.user_type === 'volunteer') {
        this.is_free = true
        if (!this.organization) {
            throw new Error(`No organization defined for ${this.first_name} ${this.last_name}`)
        }
    }
});

const Users = mongoose.model('user', userSchema);

module.exports = Users;