// Correct answers for each set
const correctAnswers = {
  1: { q1: "A", q2: "B", q3: "C" },
  2: { q1: "B", q2: "C", q3: "D" },
  3: { q1: "A", q2: "C", q3: "B" },
  4: { q1: "D", q2: "A", q3: "B" },
  5: { q1: "C", q2: "B", q3: "A" },
  6: { q1: "B", q2: "D", q3: "C" },
};

exports.submitRound1 = async (req, res) => {
  try {
    const { team_id, answers } = req.body;

    const roundData = await RoundData.findOne({ team_id });

    if (!roundData) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (roundData.round1_completed) {
      return res.status(400).json({ message: "Round 1 already completed" });
    }

    const setNumber = roundData.round1_set;
    const correct = correctAnswers[setNumber];

    let score = 0;

    for (let key in correct) {
      if (answers[key] === correct[key]) {
        score += 10;
      }
    }

    roundData.round1_score = score;
    roundData.round1_completed = true;

    await roundData.save();

    res.status(200).json({
      message: "Round 1 submitted successfully",
      score,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error submitting round" });
  }
};
