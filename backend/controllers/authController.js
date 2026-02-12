const Team = require("../models/Team");
const RoundData = require("../models/RoundData");

// Generate Random Team ID
const generateTeamId = () => {
  return "BBX" + Math.floor(1000 + Math.random() * 9000);
};

exports.registerTeam = async (req, res) => {
  try {
    const { team_name, member1, member2, member3, email } = req.body;

    const team_id = generateTeamId();

    // Save Team
    const newTeam = new Team({
      team_id,
      event_type: "BB",
      team_name,
      member1,
      member2,
      member3,
      email,
    });

    await newTeam.save();

    // Create Round Data entry
    const newRoundData = new RoundData({
      team_id,
    });

    await newRoundData.save();

    res.status(201).json({
      message: "Team registered successfully",
      team_id,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

exports.loginTeam = async (req, res) => {
  try {
    const { team_id, email } = req.body;

    const team = await Team.findOne({ team_id, email });

    if (!team) {
      return res.status(400).json({ message: "Invalid Team ID or Email" });
    }

    // If first time login, set start_time
    if (team.status === "not_started") {
      team.status = "in_progress";
      team.start_time = new Date();
      await team.save();
    }

    res.status(200).json({
      message: "Login successful",
      team_id: team.team_id,
      status: team.status,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};
