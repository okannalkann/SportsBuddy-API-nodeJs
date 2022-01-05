var express = require('express');
const Sports = require('../models/Sports');

const getSports = (req, res, next) => { // List the all Sports
    const promise = Sports.find({});
    
    promise.then((data) => {
        return res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}

const getSportsById = (req, res, next) => { // List the Sports
    const promise = Sports.findById(req.params._id);
      
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    })
}

const addNewSport = (req, res, next) => { // Add New Game
    const sport = new Sports(req.body);
    const promise = sport.save();

    promise.then((data) => {
        res.json(data);
      }).catch((err) => {
        res.json(err);
      })
  }
  
  const updateSportById = (req, res, next) => { // Update Game
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
  }
  
  const DeleteGame = (req, res, next) => { // Delete Sport
    const promise = Sports.findByIdAndRemove(req.params._id);
  
    promise.then((sport) => {
      if(!sport)
        next({message: 'Sport not found.', code: 404});
  
      res.json({status: 1});
    }).catch((err) => {
      res.json(err);
    });
  }


module.exports =  {
    getSports,
    getSportsById,
    addNewSport,
    updateSportById,
    DeleteGame
};