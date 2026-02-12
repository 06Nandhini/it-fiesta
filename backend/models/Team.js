const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  team_id: {
    type: String,
    required: true,
    unique: true,
  },
  event_type: {
    type: String, // BB or ER
    required: true,
  },
  team_name: {
    type: String,
    required: true,
  },
  member1: String,
  member2: String,
  member3: String,
  email: String,

  status: {
    type: String,
    default: "not_started", 
    // not_started / in_progress / completed / eliminated
  },

  tab_switch_count: {
    type: Number,
    default: 0,
  },

  penalty_marks: {
    type: Number,
    default: 0,
  },

  total_score: {
    type: Number,
    default: 0,
  },

  start_time: Date,
  end_time: Date,
});

module.exports = mongoose.model("Team", teamSchema);
