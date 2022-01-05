var express = require('express');
var router = express.Router();

const {getSportRequestMessages, getSportRequestMessagesbyId, addNewSportRequestMessages, 
  updateSportRequestMessagesById, deleteSportRequestMessages} = require('../controller/SportRequestMessageController');

/* GET sport request message page. */

router.get('/', getSportRequestMessages);
router.get('/:_id', getSportRequestMessagesbyId);
router.post('/new', addNewSportRequestMessages);
router.put('/:_id', updateSportRequestMessagesById);
router.delete('/:_id', deleteSportRequestMessages);

module.exports = router;