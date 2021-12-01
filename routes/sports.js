var express = require('express');
var router = express.Router();

var path = require('path');
const Sports = require('../models/Sports');

const ejs = require("ejs");
const { resolveAny } = require('dns');

/* GET sport page. */

router.get('/', function(req, res, next) { // List the all Sports
    const promise = Sports.find({});
    
    promise.then((data) => {
        return res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/:_id', (req, res, next) => { // Find Sport by id
    const promise = Sports.findById(req.params._id);
      
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    })
});

router.post('/new',function (req,res,next){ // Add new Sport
    const sport = new Sports(req.body);
    const promise = sport.save();

    promise.then((data) => {
        res.json(data);
      }).catch((err) => {
        res.json(err);
      })
});

router.put('/:_id', (req, res, next) => { // Update Sport with _id
    const promise = Sports.findByIdAndUpdate(
        req.params._id,
        req.body,
        {
          new: true
        }
    );
  
    promise.then((sport) => {
      if(!sport)
        next({message: 'Sport was not found.', code: 404});
  
      res.json(sport);
    }).catch((err) => {
      res.json(err);
    });
});

router.delete('/:_id', (req, res, next) => { // Delete Sport with _id
    const promise = Sports.findByIdAndRemove(req.params._id);
  
    promise.then((sport) => {
      if(!sport)
        next({message: 'Sport not found.', code: 404});
  
      res.json({status: 1});
    }).catch((err) => {
      res.json(err);
    });
});

module.exports = router;