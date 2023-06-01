var express = require('express');
var router = express.Router();
var passport = require('passport');
const Player = require('../models/player');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    prompt: "select_account"
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate('google', { failureRedirect: '/' }), 
  async function(req, res) {
    console.log(req.user);
    let player = await Player.findOne({user: req.user._id});
    if (player) return res.redirect('/');
    res.render('players/new', { title: 'Sign Up' });
  });

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/');
  });
});


module.exports = router;
