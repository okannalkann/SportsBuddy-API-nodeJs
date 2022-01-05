var express = require('express');
const UserWantsToPlayGames = require('../models/UserWantsToPlayGames');


const getUserWantToPlayGames = (req, res, next) => { // Get the all want to Play Games
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
}

const getUserWantToPlayGamesById = (req, res, next) => { // Get Want to play
    const promise = UserWantsToPlayGames.findById(req.params._id);
      
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
}

const addNewWantToPlayGame = (req, res, next) => { // Add New Game
    const data = new UserWantsToPlayGames(req.body);
    const promise = data.save();

    promise.then((data) => {
        res.json(data);
        }).catch((err) => {
        res.json(err);
    })
  }
  
const updateNewWantToPlayGameById = (req, res, next) => { // Update Game
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
}
  
const DeleteNewWantToPlayGame = (req, res, next) => { // Delete Sport
    const promise = UserWantsToPlayGames.findByIdAndRemove(req.params._id);
  
    promise.then((data) => {
      if(!data)
        next({message: 'User Wants To Play Games not found.', code: 404});
  
      res.json({status: 1});
    }).catch((err) => {
      res.json(err);
    });
}

module.exports =  {
    getUserWantToPlayGames,
    getUserWantToPlayGamesById,
    addNewWantToPlayGame,
    updateNewWantToPlayGameById,
    DeleteNewWantToPlayGame
};