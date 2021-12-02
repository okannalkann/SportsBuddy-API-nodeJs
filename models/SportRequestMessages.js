const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sportRequestMessagesSchema = new Schema({
    sportDescription: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sportId: {
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

module.exports = mongoose.model('sportRequestMessages', sportRequestMessagesSchema);