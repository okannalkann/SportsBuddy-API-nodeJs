var express = require('express');
var router = express.Router();

const { getSports, getSportsById, addNewSport, updateSportById, DeleteGame } = require('../controller/sportsController');


/* GET sport page. */

router.get('/', getSports);

router.get('/:_id', getSportsById);

router.post('/new', addNewSport);

router.put('/:_id', updateSportById);

router.delete('/:_id', DeleteGame);

module.exports = router;