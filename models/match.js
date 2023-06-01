const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
  playerOne: { type: Schema.Types.ObjectId, ref: 'Player', autopopulate: true},
  playerTwo: { type: Schema.Types.ObjectId, ref: 'Player', autopopulate: true},
  playerOneScore: [Number],
  playerTwoScore: [Number],
  winner: {
    player: { type: Schema.Types.ObjectId, ref: 'Player', autopopulate: true},
    boolean: {
      type: Boolean,
      default: false
    }
  },
  name: String
});

matchSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Match', matchSchema);