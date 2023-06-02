const express = require('express');
const router = express.Router();
const playersCtrl = require('../controllers/players');

/* GET users listing. */
router.get('/', playersCtrl.index);
// GET /players/new
router.get('/new', playersCtrl.new);
// POST /players
router.post('/', playersCtrl.create);

module.exports = router;
