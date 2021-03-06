const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserWantsToPlaySportsSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sportId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userDescription: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('userWantsToPlaySports', UserWantsToPlaySportsSchema);