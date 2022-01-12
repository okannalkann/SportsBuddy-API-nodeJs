const Games = require('../models/Games');

const getGames = async (req, res) => { // Get game by Id
    const list = await Games.find({});
    res.render('games', {
      data: list
    });
}

const getGamesbyId = (req, res, next) => { // Get game by Id
  const promise = Games.findById(req.params._id);
     
    promise.then((data) => {
      console.log(data);

      req.json(data);
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