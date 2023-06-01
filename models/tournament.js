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
    firstRound1: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true, default: null},
    firstRound2: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true, default: null},
    firstRound3: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true, default: null},
    firstRound4: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true, default: null},
    firstRound5: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true, default: null},
    firstRound6: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true, default: null},
    firstRound7: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true, default: null},
    firstRound8: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true, default: null},
    quarterFinal1: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true, default: null},
    quarterFinal2: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true, default: null},
    quarterFinal3: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true, default: null},
    quarterFinal4: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true, default: null},
    semiFinal1: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true, default: null},
    semiFinal2: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true, default: null},
    final: { type: Schema.Types.ObjectId, ref: 'Match', autopopulate: true, default: null},
});

tournamentSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Tournament', tournamentSchema);