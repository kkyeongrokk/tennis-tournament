const express = require('express');
const router = express.Router();
const tournamentsCtrl = require('../controllers/tournaments');

// GET /tournaments
router.get('/', tournamentsCtrl.index);
// GET /tournaments/new
router.get('/new', tournamentsCtrl.new);
// POST /tournaments/draw
router.post('/', tournamentsCtrl.create);
// GET /tournaments/:id
router.get('/:id', tournamentsCtrl.show);
// GET /tournaments/:id/registration
router.get('/:id/registration', tournamentsCtrl.register);
// PUT /tournaments/:id
router.put('/:id', tournamentsCtrl.update);

module.exports = router;