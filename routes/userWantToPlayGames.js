var express = require('express');
var router = express.Router();
const {getUserWantToPlayGames,
  getUserWantToPlayGamesById,
  addNewWantToPlayGame,
  updateNewWantToPlayGameById,
  DeleteNewWantToPlayGame} = require('../controller/userWantToPlayGamesController');

/* GET User Want To Play Games page. */

router.get('/', getUserWantToPlayGames);
router.get('/:_id', getUserWantToPlayGamesById);
router.post('/new',addNewWantToPlayGame);
router.put('/:_id', updateNewWantToPlayGameById);
router.delete('/:_id', DeleteNewWantToPlayGame);

module.exports = router;