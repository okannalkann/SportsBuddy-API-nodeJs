const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserWantsToPlayGamesSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userDescription: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('userWantsToPlayGames', UserWantsToPlayGamesSchema);