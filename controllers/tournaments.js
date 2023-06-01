const Tournament = require('../models/tournament');
const Player = require('../models/player');
const Match = require('../models/match');

module.exports = {
  index,
  create,
  new: newTournament,
  show,
  register,
  update,
  newDraw,
  showPlayer,
};

async function index(req, res) {
  const tournaments = await Tournament.find({});
  res.render('tournaments/index', { tournaments });
}

async function create(req, res) {
  // req.body.firstRound1 = new Match();
  // req.body.firstRound2 = new Match();
  // req.body.firstRound3 = new Match();
  // req.body.firstRound4 = new Match();
  // req.body.firstRound5 = new Match();
  // req.body.firstRound6 = new Match();
  // req.body.firstRound7 = new Match();
  // req.body.firstRound8 = new Match();

  const tournament = await Tournament.create(req.body);
  res.redirect(`/tournaments/${tournament._id}`);
}

function newTournament(req, res) {
  res.render('tournaments/new');
}

async function show(req, res) {
  const tournament = await Tournament.findById(req.params.id).populate('players').populate('firstRound1');
  console.log(tournament);
  res.render('tournaments/show', { title: tournament.name, tournament });
}

async function register(req, res) {
  const tournament = await Tournament.findById(req.params.id);
  const player = await Player.findOne({ user: req.user._id });
  // let registered = tournament.players.some(p => p._id.equals(player._id));
  // if (registered) return res.redirect(`/tournaments/${req.params.id}`);
  const round1 = await Match.findById(tournament.firstRound1);
  // round1.playerOne = tournament.players[0];
  // round1.playerTwo = tournament.players[1];
  // await round1.save();
  // console.log(tournament.firstRound1);
  // console.log(round1);
  tournament.players.push(player);
  await tournament.save();
  if (tournament.players.length > 16) setFirstRound(tournament);
  res.redirect(`/tournaments/${req.params.id}`);
}

async function setFirstRound(tournament) {
  let count = 1
  let playerss = tournament.players.map(p => p);
  for (let i = 0; i < 8; i+=2) {
    const players = {
      playerOne: playerss.shift(),
      playerTwo: playerss.shift(),
    };
    const newMatch = await Match.create(players);
    tournament[`firstRound${count}}`] = newMatch;
    count++;
  }
  console.log(tournament);
  await tournament.save();
}

async function update(req, res) {
  const tournament = await Tournament.findById(req.params.id);
  req.body.name = req.user.name;
  req.body.user = req.user._id;
  tournament.players.push(req.body);
  await tournament.save();
  console.log(req.body);
  res.redirect(`/tournaments/${tournament._id}`);
}

async function newDraw(req, res) {
  const tournament = await Tournament.findById(req.params.id);
  // sort by ranking
  tournament.players.sort((a, b) => a.ranking - b.ranking);
  console.log(tournament);
  // tournament.firstRound1 = { 
  //   playerOne: tournament.players[0],
  //   playerTwo: tournament.players[15],
  // };
  // tournament.firstRound2 = { 
  //   playerOne: tournament.players[6],
  //   playerTwo: tournament.players[9],
  // };
  // tournament.firstRound3 = { 
  //   playerOne: tournament.players[2],
  //   playerTwo: tournament.players[13],
  // };
  // tournament.firstRound4 = { 
  //   playerOne: tournament.players[4],
  //   playerTwo: tournament.players[11],
  // };
  // tournament.firstRound5 = { 
  //   playerOne: tournament.players[1],
  //   playerTwo: tournament.players[14],
  // };
  // tournament.firstRound6 = { 
  //   playerOne: tournament.players[7],
  //   playerTwo: tournament.players[8],
  // };
  // tournament.firstRound7 = { 
  //   playerOne: tournament.players[3],
  //   playerTwo: tournament.players[12],
  // };
  // tournament.firstRound8 = { 
  //   playerOne: tournament.players[5],
  //   playerTwo: tournament.players[10],
  // };

  res.render('tournaments/draw', { tournament });
}

async function showPlayer(req, res) {
  const tournament = await Tournament.findById(req.params.id);
  const player = tournament.players.id(req.params.playersId);
  res.render('tournaments/showPlayer', { player });
}