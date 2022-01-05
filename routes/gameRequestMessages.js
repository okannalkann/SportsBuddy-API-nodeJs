var express = require('express');
var router = express.Router();

const {getGameRequestMessages, getGameRequestMessagesbyId, addNewGameRequestMessages, 
  updateGameRequestMessagesById, deleteGameRequestMessages} = require('../controller/gameRequestMessageController');


/* GET game request message page. */

router.get('/', getGameRequestMessages);
router.get('/:_id', getGameRequestMessagesbyId);
router.post('/new', addNewGameRequestMessages);
router.put('/:_id', updateGameRequestMessagesById);
router.delete('/:_id', deleteGameRequestMessages);

module.exports = router;