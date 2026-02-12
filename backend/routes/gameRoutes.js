const express = require("express");
const router = express.Router();
const { startRound1 } = require("../controllers/gameController");


const { submitRound1 } = require("../controllers/gameController");



router.post("/start-round1", startRound1);
router.post("/submit-round1", submitRound1);
module.exports = router;
