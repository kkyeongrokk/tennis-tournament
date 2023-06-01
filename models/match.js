const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
  playerOne: { type: Schema.Types.ObjectId, ref: 'Player'},
  playerTwo: { type: Schema.Types.ObjectId, ref: 'Player'},
  playerOneScore: [Number],
  playerTwoScore: [Number],
  winner: {
    player: { type: Schema.Types.ObjectId, ref: 'Player'},
    boolean: {
      type: Boolean,
      default: false
    }
  },
  name: String
});

module.exports = mongoose.model('Match', matchSchema);