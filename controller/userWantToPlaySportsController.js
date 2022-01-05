var express = require('express');
const UserWantsToPlaySports = require('../models/UserWantsToPlaySports');

const getUserWantToPlaySports = (req, res, next) => { // Get the all want to Play Sports
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
}

const getUserWantToPlaySportsById = (req, res, next) => { // Get Want to play
  const promise = UserWantsToPlaySports.findById(req.params._id);
      
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
}

const addNewWantToPlaySport = (req, res, next) => { // Add New Want to Play Sport
  const data = new UserWantsToPlaySports(req.body);
  const promise = data.save();

  promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    })
  }
  
const updateNewWantToPlaySportById = (req, res, next) => { // Update Sport
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
}
  
const DeleteNewWantToPlaySport = (req, res, next) => { // Delete Sport
  const promise = UserWantsToPlaySports.findByIdAndRemove(req.params._id);
  
  promise.then((data) => {
    if(!data)
      next({message: 'User Wants To Play Sports not found.', code: 404});

    res.json({status: 1});
  }).catch((err) => {
    res.json(err);
  });
}

module.exports =  {
  getUserWantToPlaySports,
  getUserWantToPlaySportsById,
  addNewWantToPlaySport,
  updateNewWantToPlaySportById,
  DeleteNewWantToPlaySport
};