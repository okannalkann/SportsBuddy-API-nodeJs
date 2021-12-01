var express = require('express');
var router = express.Router();

var path = require('path');
const UserWantsToPlayGames = require('../models/UserWantsToPlayGames');

const ejs = require("ejs");
const { resolveAny } = require('dns');

/* GET User Want To Play Games page. */

router.get('/', function(req, res, next) { // List the all UserWantsToPlayGames
    const promise = UserWantsToPlayGames.aggregate([
      {
        '$lookup': {
          'from': 'users', 
          'localField': 'userId', 
          'foreignField': '_id', 
          'as': 'user'
        }
      }, {
        '$lookup': {
          'from': 'games', 
          'localField': 'gameId', 
          'foreignField': '_id', 
          'as': 'game'
        }
      }, {
        '$project': {
          'user.name': 1, 
          'user.surname': 1, 
          'game.name': 1, 
          'userDescription': 1
        }
      }
    ]);

    promise.then((data) => {
        return res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/:_id', (req, res, next) => { // Find User Wants To Play Games by id
    const promise = UserWantsToPlayGames.findById(req.params._id);
      
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });

    
});

router.post('/new',function (req,res,next){ // Add new User Wants To Play Games
    const data = new UserWantsToPlayGames(req.body);
    const promise = data.save();

    promise.then((data) => {
        res.json(data);
      }).catch((err) => {
        res.json(err);
      })
});

router.put('/:_id', (req, res, next) => { // Update User Wants To Play Games with _id
    const promise = UserWantsToPlayGames.findByIdAndUpdate(
        req.params._id,
        req.body,
        {
          new: true
        }
    );
  
    promise.then((data) => {
      if(!data)
        next({message: 'User Wants To Play Games was not found.', code: 404});
  
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
});

router.delete('/:_id', (req, res, next) => { // Delete User Wants To Play Games with _id
    const promise = UserWantsToPlayGames.findByIdAndRemove(req.params._id);
  
    promise.then((data) => {
      if(!data)
        next({message: 'User Wants To Play Games not found.', code: 404});
  
      res.json({status: 1});
    }).catch((err) => {
      res.json(err);
    });
});

module.exports = router;