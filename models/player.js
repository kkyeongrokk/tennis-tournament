const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: {
    type: String,
    required: true,
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

module.exports = mongoose.model('Player', playerSchema);