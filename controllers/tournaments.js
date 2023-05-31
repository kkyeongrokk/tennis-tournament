const Tournament = require('../models/tournament');

module.exports = {
  index,
  create,
  new: newTournament,
  show,
  register,
  update
};

async function index(req, res) {
  const tournaments = await Tournament.find({});
  res.render('tournaments/index', { tournaments });
}

async function create(req, res) {
  // console.log(req.body);
  // req.body.firstRound1 = { 
  //   playerOne: req.body.player1,
  //   playerTwo: req.body.player2,
  // };

  // console.log(req.body);
  // const tournament = await Tournament.create(req.body);
  // console.log(tournament);
  const tournament = await Tournament.create(req.body);
  res.redirect('/tournaments');
}

function newTournament(req, res) {
  res.render('tournaments/new');
}

async function show(req, res) {
  const tournament = await Tournament.findById(req.params.id);
  res.render('tournaments/show', { title: tournament.name, tournament });
}

async function register(req, res) {
  const tournament = await Tournament.findById(req.params.id);
  res.render('tournaments/newRegister', { tournament });
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