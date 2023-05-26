const Player = require('../models/player');

module.exports = {
  index
}

async function index(req, res) {
  const players = await Player.find({});
  res.render('players/index', {});
}