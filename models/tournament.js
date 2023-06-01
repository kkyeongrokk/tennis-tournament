const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
    name: String,
    clubName: String,
    date: {
      type: Date,
      default: new Date()
    },
    location: String,
    players: [{ type: Schema.Types.ObjectId, ref: 'Player'}],
    firstRound1: { type: Schema.Types.ObjectId, ref: 'Match'},
    firstRound2: { type: Schema.Types.ObjectId, ref: 'Match'},
    firstRound3: { type: Schema.Types.ObjectId, ref: 'Match'},
    firstRound4: { type: Schema.Types.ObjectId, ref: 'Match'},
    firstRound5: { type: Schema.Types.ObjectId, ref: 'Match'},
    firstRound6: { type: Schema.Types.ObjectId, ref: 'Match'},
    firstRound7: { type: Schema.Types.ObjectId, ref: 'Match'},
    firstRound8: { type: Schema.Types.ObjectId, ref: 'Match'},
    quarterFinal1: { type: Schema.Types.ObjectId, ref: 'Match'},
    quarterFinal2: { type: Schema.Types.ObjectId, ref: 'Match'},
    quarterFinal3: { type: Schema.Types.ObjectId, ref: 'Match'},
    quarterFinal4: { type: Schema.Types.ObjectId, ref: 'Match'},
    semiFinal1: { type: Schema.Types.ObjectId, ref: 'Match'},
    semiFinal2: { type: Schema.Types.ObjectId, ref: 'Match'},
    final: { type: Schema.Types.ObjectId, ref: 'Match'},
});

module.exports = mongoose.model('Tournament', tournamentSchema);