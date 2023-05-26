const Player = require('../models/player');

module.exports = {
  index,
  new: newPlayer,
  create,
  show
};

async function index(req, res) {
  const players = await Player.find({});
  res.render('players/index', {title: 'Players List', players});
}

function newPlayer(req, res) {
  res.render('players/new', {title: 'Register'});
}

async function create(req, res) {
  const player = await Player.create(req.body);
  res.redirect('/players');
}

async function show(req, res) {
  const player = await Player.findById(req.params.id);
  res.render(`players/show`, {player})
}