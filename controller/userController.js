const Users = require('../models/Users');

const getUser = (req, res, next) => { // Get the all user
    const promise = Users.find({});
    
    promise.then((data) => {
        return res.json(data);
    }).catch((err) => {
        res.json(err);
    });
  }
  
  const getUserByPhoneNumber = (req, res, next) => { // Get user by phoneNumber
    const promise = Users.findById(req.params.phoneNumber);
      
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    })
  }

  const getUserById = (req, res, next) => { // Get User by Id
    const promise = Users.findById(req.params._id);
    
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
  }
  
  const addUser = (req, res, next) => { // Add New User
    const user = new Users(req.body);
    const promise = user.save();

    promise.then((data) => {
        res.json(data);
      }).catch((err) => {
        res.json(err);
      })
    }
    
  const updateUserById = (req, res, next) => { // Update User
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
  }
    
  const deleteUser = (req, res, next) => { // Delete User
    const promise = Users.findByIdAndRemove(req.params._id);
  
    promise.then((user) => {
      if(!user)
        next({message: 'User not found.', code: 404});
  
      res.json({status: 1});
    }).catch((err) => {
      res.json(err);
    });
  }
  
  module.exports =  {
    getUser,
    getUserByPhoneNumber,
    getUserById,
    addUser,
    updateUserById,
    deleteUser
  };