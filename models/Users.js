const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    findingFriend: {
        type: Number,
        default: 1
    },
    registerDate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('users', UserSchema);