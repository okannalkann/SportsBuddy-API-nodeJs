var express = require('express');
var router = express.Router();

var path = require('path');
const Games = require('../models/Games');

const ejs = require("ejs");
const { resolveAny } = require('dns');

/* GET games page. */

router.get('/', function(req, res, next) { // List the all Games
    const promise = Games.find({});
    
    const alkano = [ {name: 'fps'}, {name: 'csgo'}, {name: 'okan'}];
  
    promise.then((data) => {
      //res.sendFile(path.resolve('./templates/index.html'));
      return res.json(data);
    }).catch((err) => {
      res.json(err);
    });
});

router.get('/:_id', (req, res, next) => { // Find Game by id
    const promise = Games.findById(req.params._id);
      
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    })
});

router.post('/new',function (req,res,next){ // Add new Game
    const game = new Games(req.body);
    const promise = game.save();

    promise.then((data) => {
        res.json(data);
      }).catch((err) => {
        res.json(err);
      })
});

router.put('/:_id', (req, res, next) => { // Update Game with _id
    const promise = Games.findByIdAndUpdate(
        req.params._id,
        req.body,
        {
          new: true
        }
    );
  
    promise.then((game) => {
      if(!game)
        next({message: 'Game was not found.', code: 404});
  
      res.json(game);
    }).catch((err) => {
      res.json(err);
    });
});

router.delete('/:_id', (req, res, next) => { // Delete Game with _id
    const promise = Games.findByIdAndRemove(req.params._id);
  
    promise.then((game) => {
      if(!game)
        next({message: 'Game was not found.', code: 404});
  
      res.json({status: 1});
    }).catch((err) => {
      res.json(err);
    });
});

module.exports = router;