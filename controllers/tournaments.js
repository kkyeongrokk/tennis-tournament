const Tournament = require('../models/tournament');

module.exports = {
  index,
  create,
  new: newTournament,
  show,
  register,
  update,
  newDraw,
  showPlayer
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

async function newDraw(req, res) {
  const tournament = await Tournament.findById(req.params.id);
  // sort by ranking
  tournament.players.sort((a, b) => a.ranking - b.ranking);

  tournament.firstRound1 = { 
    playerOne: tournament.players[0],
    playerTwo: tournament.players[15],
  };
  tournament.firstRound2 = { 
    playerOne: tournament.players[6],
    playerTwo: tournament.players[9],
  };
  tournament.firstRound3 = { 
    playerOne: tournament.players[2],
    playerTwo: tournament.players[13],
  };
  tournament.firstRound4 = { 
    playerOne: tournament.players[4],
    playerTwo: tournament.players[11],
  };
  tournament.firstRound5 = { 
    playerOne: tournament.players[1],
    playerTwo: tournament.players[14],
  };
  tournament.firstRound6 = { 
    playerOne: tournament.players[7],
    playerTwo: tournament.players[8],
  };
  tournament.firstRound7 = { 
    playerOne: tournament.players[3],
    playerTwo: tournament.players[12],
  };
  tournament.firstRound8 = { 
    playerOne: tournament.players[5],
    playerTwo: tournament.players[10],
  };
  console.log(tournament);

  res.render('tournaments/draw', { tournament });
}

async function showPlayer(req, res) {
  
}