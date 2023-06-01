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
    players: [{ type: Schema.Types.ObjectId, ref: 'Player', autopopulate: true}],
    firstRound1: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true},
    firstRound2: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true},
    firstRound3: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true},
    firstRound4: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true},
    firstRound5: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true},
    firstRound6: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true},
    firstRound7: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true},
    firstRound8: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true},
    quarterFinal1: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true},
    quarterFinal2: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true},
    quarterFinal3: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true},
    quarterFinal4: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true},
    semiFinal1: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true},
    semiFinal2: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true},
    final: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true},
});

tournamentSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Tournament', tournamentSchema);