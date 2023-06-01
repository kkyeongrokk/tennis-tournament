const Tournament = require('../models/tournament');
const Player = require('../models/player');
const Match = require('../models/match');

module.exports = {
  index,
  create,
  new: newTournament,
  show,
  register,
  newDraw,
  showPlayer,
  delete: deleteTournament,
  edit,
  update,
  showMatch,
  updateMatch
};

async function index(req, res) {
  const tournaments = await Tournament.find({});
  res.render('tournaments/index', { tournaments });
}

async function create(req, res) {
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
  // if (registered || tournament.players.length === 17) return res.redirect(`/tournaments/${req.params.id}`);
  
  tournament.players.push(player);

  if (tournament.players.length === 16) {
    let playerss = tournament.players.map(p=>p);
    console.log("in if statement");
    for (let i = 0; i < 8; i++) {
      const players = {
        playerOne: playerss.shift(),
        playerTwo: playerss.shift()
      };
      const newMatch = await Match.create(players);
      tournament[`firstRound${i + 1}`] = newMatch._id;
    }
  }

  await tournament.save();
  res.redirect(`/tournaments/${req.params.id}`);
}

async function newDraw(req, res) {
  const tournament = await Tournament.findById(req.params.id);
  res.render('tournaments/draw', { tournament });
}

async function showPlayer(req, res) {
  const tournament = await Tournament.findById(req.params.id);
  const player = tournament.players.id(req.params.playersId);
  res.render('tournaments/showPlayer', { player });
}

async function deleteTournament(req, res) {
  await Tournament.deleteOne({_id: req.params.id});
  res.redirect('/tournaments');
}

async function edit(req, res) {
  const tournament = await Tournament.findById(req.params.id);
  res.render('tournaments/edit', { tournament });
}

async function update(req, res) {
  await Tournament.updateOne({_id: req.params.id}, req.body);
  res.redirect(`/tournaments/${req.params.id}`)
}

async function showMatch(req, res) {
  const match = await Match.findById(req.params.matchId);
  const tournament = await Tournament.findById(req.params.id);
  res.render('tournaments/match', { title: 'Match Score', match, tournament });
}

async function updateMatch(req, res) {
  const match = await Match.findById(req.params.matchId);
  for (let i = 1; i < 4; i++) {
    if (req.body[`p1Score${i}`])  match.playerOneScore.push(parseInt(req.body[`p1Score${i}`]));
    if (req.body[`p2Score${i}`])  match.playerTwoScore.push(parseInt(req.body[`p2Score${i}`]));
  }

  // winLogic
  let count1, count2 = 0;
  for (let i = 0; i < 3; i++) {
    match.playerOneScore[i] > match.playerTwoScore[i] ? ++count1 : ++count2
  }
  match.winner.boolean = true;
  if (count1 >= 2) {
    match.winner.player = match.playerOne;
  } else {
    match.winner.player = match.playerTwo;
  }

  console.log(match);

  await match.save();
  res.redirect(`/tournaments/${req.params.id}/match/${req.params.matchId}`);
}