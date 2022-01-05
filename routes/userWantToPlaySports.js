var express = require('express');
var router = express.Router();
const {getUserWantToPlaySports, getUserWantToPlaySportsById, addNewWantToPlaySport,
  updateNewWantToPlaySportById, DeleteNewWantToPlaySport} = require('../controller/userWantToPlaySportsController');
/* GET User Want To Play Sport page. */

router.get('/', getUserWantToPlaySports);
router.get('/:_id', getUserWantToPlaySportsById);
router.post('/new',addNewWantToPlaySport);
router.put('/:_id', updateNewWantToPlaySportById);
router.delete('/:_id', DeleteNewWantToPlaySport);

module.exports = router;