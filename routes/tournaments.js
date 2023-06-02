const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const tournamentsCtrl = require('../controllers/tournaments');

// GET /tournaments
router.get('/', tournamentsCtrl.index);
// GET /tournaments/new
router.get('/new', ensureLoggedIn, tournamentsCtrl.new);
// POST /tournaments
router.post('/', ensureLoggedIn, tournamentsCtrl.create);
// GET /tournaments/register
router.get('/:id/register', ensureLoggedIn, tournamentsCtrl.register);
// GET /tournaments/:id
router.get('/:id', tournamentsCtrl.show);
// GET /tournaments/:id/draw
router.get('/:id/draw', tournamentsCtrl.draw);
// GET /tournaments/:id/players/:playersId
router.get('/:id/players/:playersId', tournamentsCtrl.showPlayer);
// DELETE /tournaments/:id
router.delete('/:id', ensureLoggedIn, tournamentsCtrl.delete);
// GET /tournaments/:id/edit
router.get('/:id/edit', ensureLoggedIn, tournamentsCtrl.edit);
// PUT /tournaments/:id
router.put('/:id', ensureLoggedIn, tournamentsCtrl.update);
// GET /tournaments/:id/match/:matchId
router.get('/:id/match/:matchId', tournamentsCtrl.showMatch);
// PUT /tournaments/:id/draw/:matchId
router.put('/:id/draw/:matchId', ensureLoggedIn, tournamentsCtrl.updateMatch);

module.exports = router;