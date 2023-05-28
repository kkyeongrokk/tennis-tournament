const mogoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
  playerOne: {
    type: Schema.Types.ObjectId,
    refer: "Player"
  },
  playerTwo: {
    type: Schema.Types.ObjectId,
    refer: "Player"
  },
  playerOneScore: [Number],
  playerTwoScore: [Number],
  winner: {
    type: Schema.Types.ObjectId,
    refer: "Player",
    default: false
  }
});

module.exports = mongoose.model('Match', matchSchema);