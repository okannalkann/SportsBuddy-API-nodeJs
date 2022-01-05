const Games = require('../models/GameRequestMessages');

const getGameRequestMessages = (req, res, next) => { // List the all GameRequestMessages
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
}

const getGameRequestMessagesbyId = (req, res, next) => { // Get GameRequestMessages by Id
    const promise = GameRequestMessages.findById(req.params._id);
      
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    })
}

const addNewGameRequestMessages = (req, res, next) => { // Add New GameRequestMessages
    const gameRequestComment = new GameRequestMessages(req.body);
    const promise = gameRequestComment.save();

    promise.then((data) => {
        res.json(data);
      }).catch((err) => {
        res.json(err);
      })
}

const updateGameRequestMessagesById = (req, res, next) => { // Update GameRequestMessages
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
}

const deleteGameRequestMessages = (req, res, next) => { // Delete GameRequestMessages
    const promise = GameRequestMessages.findByIdAndRemove(req.params._id);
  
    promise.then((comment) => {
      if(!comment)
        next({message: 'comment not found.', code: 404});
  
      res.json({status: 1});
    }).catch((err) => {
      res.json(err);
    });
}

module.exports =  {
  getGameRequestMessages,
  getGameRequestMessagesbyId,
  addNewGameRequestMessages,
  updateGameRequestMessagesById,
  deleteGameRequestMessages
};