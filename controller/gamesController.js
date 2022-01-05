var express = require('express');
const Games = require('../models/Games');
var ejs = require('ejs');

const getGames = (req, res, next) => { // List the all Games
    const promise = Games.find({});

    promise.then((data) => {
      console.log('asd');
      res.render('games', { data: data });

      // return res.json(data);
    }).catch((err) => {
      res.json(err.message);
    });
}

const getGamesbyId = (req, res, next) => { // Get game by Id
  const promise = Games.findById(req.params._id);
      
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    })
}

const addNewGame = (req, res, next) => { // Add New Game
  const game = new Games(req.body);
  const promise = game.save();

  promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    })
}

const updateGameById = (req, res, next) => { // Update Game
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
}

const DeleteGame = (req, res, next) => { // Delete Game
  const promise = Games.findByIdAndRemove(req.params._id);
  
  promise.then((game) => {
    if(!game)
      next({message: 'Game was not found.', code: 404});

    res.json({status: 1});
  }).catch((err) => {
    res.json(err);
  });
}

module.exports =  {
  getGames,
  getGamesbyId,
  addNewGame,
  updateGameById,
  DeleteGame
};