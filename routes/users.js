var express = require('express');
var router = express.Router();

var path = require('path');
const Users = require('../models/Users');

const ejs = require("ejs");
const { resolveAny } = require('dns');

/* GET Users */

router.get('/', function(req, res, next) { // List the all Users
    const promise = Users.find({});
    
    promise.then((data) => {
        return res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/:phoneNumber', (req, res, next) => { // Find User by id
    const promise = Users.findById(req.params.phoneNumber);
      
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    })
});

router.get('/:name', (req, res, next) => { // Find User by id
  const promise = Users.findById(req.params._id);
    
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});

router.post('/new',function (req,res,next){ // Add new User
    const user = new Users(req.body);
    const promise = user.save();

    promise.then((data) => {
        res.json(data);
      }).catch((err) => {
        res.json(err);
      })
});

router.put('/:_id', (req, res, next) => { // Update User with _id
    const promise = Users.findByIdAndUpdate(
        req.params._id,
        req.body,
        {
          new: true
        }
    );
  
    promise.then((user) => {
      if(!user)
        next({message: 'User was not found.', code: 404});
  
      res.json(user);
    }).catch((err) => {
      res.json(err);
    });
});

router.delete('/:_id', (req, res, next) => { // Delete User with _id
    const promise = Users.findByIdAndRemove(req.params._id);
  
    promise.then((user) => {
      if(!user)
        next({message: 'User not found.', code: 404});
  
      res.json({status: 1});
    }).catch((err) => {
      res.json(err);
    });
});

module.exports = router;