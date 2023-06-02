const express = require('express');
const router = express.Router();
const tournamentsCtrl = require('../controllers/tournaments');

// GET /tournaments
router.get('/', tournamentsCtrl.index);
// GET /tournaments/new
router.get('/new', tournamentsCtrl.new);
// POST /tournaments
router.post('/', tournamentsCtrl.create);
// GET /tournaments/register
router.get('/:id/register', tournamentsCtrl.register);
// GET /tournaments/:id
router.get('/:id', tournamentsCtrl.show);
// GET /tournaments/:id/draw
router.get('/:id/draw', tournamentsCtrl.draw);
// GET /tournaments/:id/players/:playersId
router.get('/:id/players/:playersId', tournamentsCtrl.showPlayer);
// DELETE /tournaments/:id
router.delete('/:id', tournamentsCtrl.delete);
// GET /tournaments/:id/edit
router.get('/:id/edit', tournamentsCtrl.edit);
// PUT /tournaments/:id
router.put('/:id', tournamentsCtrl.update);
// GET /tournaments/:id/match/:matchId
router.get('/:id/match/:matchId', tournamentsCtrl.showMatch);
// PUT /tournaments/:id/draw/:matchId
router.put('/:id/draw/:matchId', tournamentsCtrl.updateMatch);

module.exports = router;