var express = require('express');
var router = express.Router();

var path = require('path');
const GameRequestMessages = require('../models/GameRequestMessages');

const ejs = require("ejs");
const { resolveAny } = require('dns');

/* GET game request message page. */

router.get('/', function(req, res, next) { // List the all GameRequestMessages comment
    const promise = GameRequestMessages.aggregate([
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
          '$lookup': {
            'from': 'userwantstoplaygames', 
            'localField': 'postId', 
            'foreignField': '_id', 
            'as': 'userDesc'
          }
        }, {
          '$project': {
            'user': 1, 
            'game': 1, 
            'gameDescription': 1,
            'userDesc':1
          }
        }
      ]);
    
    promise.then((data) => {
        return res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/:_id', (req, res, next) => { // Find Game Comment by id
    const promise = GameRequestMessages.findById(req.params._id);
      
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    })
});

router.post('/new',function (req,res,next){ // Add new Game Comment
    const gameRequestComment = new GameRequestMessages(req.body);
    const promise = gameRequestComment.save();

    promise.then((data) => {
        res.json(data);
      }).catch((err) => {
        res.json(err);
      })
});

router.put('/:_id', (req, res, next) => { // Update Game Comment with _id
    const promise = GameRequestMessages.findByIdAndUpdate(
        req.params._id,
        req.body,
        {
          new: true
        }
    );
  
    promise.then((comment) => {
      if(!comment)
        next({message: 'Comment was not found.', code: 404});
  
      res.json(comment);
    }).catch((err) => {
      res.json(err);
    });
});

router.delete('/:_id', (req, res, next) => { // Delete comment with _id
    const promise = GameRequestMessages.findByIdAndRemove(req.params._id);
  
    promise.then((comment) => {
      if(!comment)
        next({message: 'comment not found.', code: 404});
  
      res.json({status: 1});
    }).catch((err) => {
      res.json(err);
    });
});

module.exports = router;