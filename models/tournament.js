const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: 'TBD'
  },
  age: Number,
  country: String,
  ranking: {
    type: Number,
    required: true
  },
  utr: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const matchSchema = new Schema({
    playerOne: playerSchema,
    playerTwo: playerSchema,
    playerOneScore: [Number],
    playerTwoScore: [Number],
    winner: {
      type: Number,
      ref: "Player",
    }
  });

const tournamentSchema = new Schema({
    name: String,
    clubName: String,
    date: {
      type: Date,
      default: new Date()
    },
    location: String,
    players: [playerSchema],
    firstRound1: matchSchema,
    firstRound2: matchSchema,
    firstRound3: matchSchema,
    firstRound4: matchSchema,
    firstRound5: matchSchema,
    firstRound6: matchSchema,
    firstRound7: matchSchema,
    firstRound8: matchSchema,
    quarterFinal1: matchSchema,
    quarterFinal2: matchSchema,
    quarterFinal3: matchSchema,
    quarterFinal4: matchSchema,
    semiFinal1: matchSchema,
    semiFinal2: matchSchema,
    final: matchSchema,
});

module.exports = mongoose.model('Tournament', tournamentSchema);