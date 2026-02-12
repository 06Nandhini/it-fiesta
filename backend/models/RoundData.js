const mongoose = require("mongoose");

const roundDataSchema = new mongoose.Schema({
  team_id: {
    type: String,
    required: true,
  },

  round1_set: Number,
  round2_set: Number,
  round3_set: Number,

  round1_score: {
    type: Number,
    default: 0,
  },

  round1_completed: {
    type: Boolean,
    default: false,
  },

  answers: {
    type: Object, 
    default: {},
  },
});

module.exports = mongoose.model("RoundData", roundDataSchema);
