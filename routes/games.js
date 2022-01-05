var express = require('express');
var router = express.Router();

const {getGames, getGamesbyId, addNewGame, updateGameById, DeleteGame} = require('../controller/gamesController');

/* GET games page. */

router.get('/', getGames);
router.get('/:_id', getGamesbyId);
router.post('/new', addNewGame);
router.put('/:_id', updateGameById);
router.delete('/:_id', DeleteGame);

module.exports = router;