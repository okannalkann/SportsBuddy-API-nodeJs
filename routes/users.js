var express = require('express');
var router = express.Router();

const {getUser, getUserByPhoneNumber, getUserById, addUser, updateUserById, deleteUser} = require('../controller/userController');

/* GET Users */

router.get('/', getUser);
router.get('/:phoneNumber', getUserByPhoneNumber);
router.get('/:id', getUserById);
router.post('/new', addUser);
router.put('/:_id', updateUserById);
router.delete('/:_id', deleteUser);

module.exports = router;