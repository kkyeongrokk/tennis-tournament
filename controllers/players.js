const Player = require('../models/player');

module.exports = {
  index,
  new: newPlayer,
  create,
};

async function index(req, res) {
  const players = await Player.find({});
  res.render('players/index', {title: 'Players List', players});
}

function newPlayer(req, res) {
  res.render('players/new', {title: 'Register'});
}

async function create(req, res) {
  req.body.user = req.user._id;
  const player = await Player.create(req.body);
  res.redirect('/');
}