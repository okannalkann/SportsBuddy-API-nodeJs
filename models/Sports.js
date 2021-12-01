const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SportsSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
});

module.exports = mongoose.model('sports', SportsSchema);