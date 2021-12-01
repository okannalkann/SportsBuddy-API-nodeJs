const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    categoryName: [{ category: String }]
});

module.exports = mongoose.model('games', GameSchema);