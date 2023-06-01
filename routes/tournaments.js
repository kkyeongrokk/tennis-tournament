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
// GET /tournaments/:id/registration
router.get('/:id/registration', tournamentsCtrl.register);
// PUT /tournaments/:id
router.put('/:id', tournamentsCtrl.update);
// GET /tournaments/:id/draw
router.get('/:id/draw', tournamentsCtrl.newDraw);
// GET /tournaments/:id/players/:playersId
router.get('/:id/players/:playersId', tournamentsCtrl.showPlayer);
// DELETE /tournaments/:id/players/:id

module.exports = router;