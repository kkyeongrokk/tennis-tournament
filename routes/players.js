const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const playersCtrl = require('../controllers/players');

/* GET users listing. */
router.get('/', playersCtrl.index);
// GET /players/new
router.get('/new', ensureLoggedIn, playersCtrl.new);
// POST /players
router.post('/', ensureLoggedIn, playersCtrl.create);

module.exports = router;
