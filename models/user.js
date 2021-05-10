const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    is_volunteer: {type: Boolean, required: true, default: true},
    phone: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    birthday: {type: Date, required: true},
    organization: {type: String, required: false},
    is_free: {type: String, required: false, default:null}

});

userSchema.pre('save', function () {
    if (this.is_volunteer) {
        this.is_free = true
        if (!this.organization) {
            throw new Error(`No organization defined for volunteer ${this.first_name} ${this.last_name}`)
        }
    } else {
        this.is_free = null
        this.organization = null
    }
});

const User = mongoose.model('users', userSchema);

module.exports = User;