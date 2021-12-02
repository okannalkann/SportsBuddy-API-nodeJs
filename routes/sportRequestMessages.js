var express = require('express');
var router = express.Router();

var path = require('path');
const SportRequestMessages = require('../models/SportRequestMessages');

const ejs = require("ejs");
const { resolveAny } = require('dns');

/* GET sport request message page. */

router.get('/', function(req, res, next) { // List the all SportRequestMessages comment
  const promise = SportRequestMessages.aggregate([
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
      '$lookup': {
        'from': 'userwantstoplaysports', 
        'localField': 'postId', 
        'foreignField': '_id', 
        'as': 'userDesc'
      }
    }, {
      '$project': {
        'user': 1, 
        'sport': 1, 
        'sportDescription': 1,
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

router.get('/:_id', (req, res, next) => { // Find Sport Comment by id
    const promise = SportRequestMessages.findById(req.params._id);
      
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    })
});

router.post('/new',function (req,res,next){ // Add new Sport
    const sportRequestComment = new SportRequestMessages(req.body);
    const promise = sportRequestComment.save();

    promise.then((data) => {
        res.json(data);
      }).catch((err) => {
        res.json(err);
      })
});

router.put('/:_id', (req, res, next) => { // Update Sport with _id
    const promise = SportRequestMessages.findByIdAndUpdate(
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
    const promise = SportRequestMessages.findByIdAndRemove(req.params._id);
  
    promise.then((comment) => {
      if(!comment)
        next({message: 'comment not found.', code: 404});
  
      res.json({status: 1});
    }).catch((err) => {
      res.json(err);
    });
});

module.exports = router;