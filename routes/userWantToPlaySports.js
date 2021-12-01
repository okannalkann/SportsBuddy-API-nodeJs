var express = require('express');
var router = express.Router();

var path = require('path');
const UserWantsToPlaySports = require('../models/UserWantsToPlaySports');

const ejs = require("ejs");
const { resolveAny } = require('dns');

/* GET User Want To Play Sport page. */

router.get('/', function(req, res, next) { // List the all UserWantsToPlaySports
    const promise = UserWantsToPlaySports.aggregate([
      {
        '$lookup': {
          'from': 'users', 
          'localField': 'userId', 
          'foreignField': '_id', 
          'as': 'user'
        }
      }, {
        '$lookup': {
          'from': 'sports', 
          'localField': 'sportId', 
          'foreignField': '_id', 
          'as': 'sport'
        }
      }, {
        '$project': {
          'user.name': 1, 
          'user.surname': 1, 
          'sport.name': 1, 
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

router.get('/:_id', (req, res, next) => { // Find User Wants To Play Sports by id
    const promise = UserWantsToPlaySports.findById(req.params._id);
      
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });

    
});

router.post('/new',function (req,res,next){ // Add new User Wants To Play Sports
    const data = new UserWantsToPlaySports(req.body);
    const promise = data.save();

    promise.then((data) => {
        res.json(data);
      }).catch((err) => {
        res.json(err);
      })
});

router.put('/:_id', (req, res, next) => { // Update User Wants To Play Sports with _id
    const promise = UserWantsToPlaySports.findByIdAndUpdate(
        req.params._id,
        req.body,
        {
          new: true
        }
    );
  
    promise.then((data) => {
      if(!data)
        next({message: 'User Wants To Play Sports was not found.', code: 404});
  
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
});

router.delete('/:_id', (req, res, next) => { // Delete User Wants To Play Sports with _id
    const promise = UserWantsToPlaySports.findByIdAndRemove(req.params._id);
  
    promise.then((data) => {
      if(!data)
        next({message: 'User Wants To Play Sports not found.', code: 404});
  
      res.json({status: 1});
    }).catch((err) => {
      res.json(err);
    });
});

module.exports = router;