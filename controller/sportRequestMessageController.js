const Games = require('../models/SportRequestMessages');

const getSportRequestMessages = (req, res, next) => { // List the all Sport Request Messages
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
}

const getSportRequestMessagesbyId = (req, res, next) => { // Get Sport Request Messages by Id
    const promise = SportRequestMessages.findById(req.params._id);
      
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    })
}

const addNewSportRequestMessages = (req, res, next) => { // Add New Sport Request Messages
    const sportRequestComment = new SportRequestMessages(req.body);
    const promise = sportRequestComment.save();

    promise.then((data) => {
        res.json(data);
      }).catch((err) => {
        res.json(err);
      })
}

const updateSportRequestMessagesById = (req, res, next) => { // Update Sport Request Messages
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
}

const deleteSportRequestMessages = (req, res, next) => { // Delete Sport Request Messages
    const promise = SportRequestMessages.findByIdAndRemove(req.params._id);
  
    promise.then((comment) => {
      if(!comment)
        next({message: 'comment not found.', code: 404});
  
      res.json({status: 1});
    }).catch((err) => {
      res.json(err);
    });
}

module.exports =  {
  getSportRequestMessages,
  getSportRequestMessagesbyId,
  addNewSportRequestMessages,
  updateSportRequestMessagesById,
  deleteSportRequestMessages
};