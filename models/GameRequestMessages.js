const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameRequestMessagesSchema = new Schema({
    gameDescription: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('gameRequestMessages', gameRequestMessagesSchema);