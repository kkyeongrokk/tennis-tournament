const Tournament = require('../models/tournament');
const Player = require('../models/player');
const Match = require('../models/match');

module.exports = {
  index,
  create,
  new: newTournament,
  show,
  register,
  draw,
  showPlayer,
  delete: deleteTournament,
  edit,
  update,
  showMatch,
  updateMatch
};

async function index(req, res) {
  const tournaments = await Tournament.find({});
  res.render('tournaments/index', { title: 'Tournaments', tournaments });
}

async function create(req, res) {
  const tournament = await Tournament.create(req.body);
  console.log(tournament.date);
  res.redirect(`/tournaments/${tournament._id}`);
}

function newTournament(req, res) {
  res.render('tournaments/new', {title: 'New Tournament'});
}

async function show(req, res) {
  const tournament = await Tournament.findById(req.params.id).populate('players').populate('firstRound1');
  res.render('tournaments/show', { title: tournament.name, tournament });
}

// register for the tournament and if there are 16 players, automatically putting out the draw
async function register(req, res) {
  const tournament = await Tournament.findById(req.params.id);
  const player = await Player.findOne({ user: req.user._id });
  // One user can only register once in the web app
  // let registered = tournament.players.some(p => p._id.equals(player._id));
  // if (registered || tournament.players.length === 17) return res.redirect(`/tournaments/${req.params.id}`);
  
  tournament.players.push(player);

  if (tournament.players.length === 16) {
    let playerss = tournament.players.map(p=>p);
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

// render draw page
async function draw(req, res) {
  const tournament = await Tournament.findById(req.params.id);
  res.render('tournaments/draw', { title: `${tournament.name} - Draw`, tournament });
}

async function showPlayer(req, res) {
  const tournament = await Tournament.findById(req.params.id);
  const player = await Player.findById(req.params.playersId);
  res.render('tournaments/showPlayer', { title: `${tournament.name} - ${player.name}`, player });
}

async function deleteTournament(req, res) {
  await Tournament.deleteOne({_id: req.params.id});
  res.redirect('/tournaments');
}

async function edit(req, res) {
  const tournament = await Tournament.findById(req.params.id);
  res.render('tournaments/edit', { title: `${tournament.name} - Edit`, tournament });
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

// add score to the matches and create qf, sf, and final 
async function updateMatch(req, res) {
  const match = await Match.findById(req.params.matchId);
  // push the score to arrays
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
  await match.save();

  // create quarter final
  const tournament = await Tournament.findById(req.params.id);
  let count = 1;
  for (let i = 1; i < 8; i+=2) {
    if (tournament[`firstRound${i}`].winner.boolean && tournament[`firstRound${i + 1}`].winner.boolean) {
      if (!tournament[`quarterFinal${count}`]) {
          const players = {
          playerOne: tournament[`firstRound${i}`].winner.player,
          playerTwo: tournament[`firstRound${i + 1}`].winner.player
        };
        const newMatch = await Match.create(players);
        tournament[`quarterFinal${count}`] = newMatch;
      }
    }
    count++;
  }

  // create semi final
  count = 1;
  for (let i = 1; i < 4; i+=2) {
    if (tournament[`quarterFinal${i}`] && tournament[`quarterFinal${i + 1}`]) {
      if (tournament[`quarterFinal${i}`].winner.boolean && tournament[`quarterFinal${i + 1}`].winner.boolean) {
        if (!tournament[`semiFinal${count}`]) {
            const players = {
            playerOne: tournament[`quarterFinal${i}`].winner.player,
            playerTwo: tournament[`quarterFinal${i + 1}`].winner.player
          };
          const newMatch = await Match.create(players);
          tournament[`semiFinal${count}`] = newMatch;
        }
      }
    }
    count++;
  }

  // create final
  for (let i = 1; i < 2; i+=2) {
    if (tournament[`semiFinal${i}`] && tournament[`semiFinal${i + 1}`]) {
      if (tournament[`semiFinal${i}`].winner.boolean && tournament[`semiFinal${i + 1}`].winner.boolean) {
        if (!tournament.final) {
            const players = {
            playerOne: tournament[`semiFinal${i}`].winner.player,
            playerTwo: tournament[`semiFinal${i + 1}`].winner.player
          };
          const newMatch = await Match.create(players);
          tournament.final = newMatch;
        }
      }
    }
  }

  const updated = await tournament.save();
  console.log(updated);

  res.redirect(`/tournaments/${req.params.id}/match/${req.params.matchId}`);
}