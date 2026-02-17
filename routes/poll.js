const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Poll = require("../models/Poll");
const Option = require("../models/Option");
const Vote = require("../models/Vote");


const router = express.Router();

router.post("/", async (req, res) => {
  const { question, options } = req.body;

  if (!question || options.length < 2) {
    return res.status(400).json({ error: "Invalid poll data" });
  }

  const pollId = uuidv4();

  await Poll.create({ id: pollId, question });

  for (let text of options) {
    await Option.create({
      id: uuidv4(),
      text,
      PollId: pollId
    });
  }

  res.json({ pollId });
});

router.post("/:pollId/vote", async (req, res) => {
  const { pollId } = req.params;
  const { optionId, voterHash } = req.body;

  const alreadyVoted = await Vote.findOne({
    where: { pollId, voterHash }
  });

  if (alreadyVoted) {
    return res.status(403).json({ error: "Already voted" });
  }

  await Vote.create({ pollId, voterHash });
  await Option.increment("votes", { where: { id: optionId } });

  const updatedOptions = await Option.findAll({ where: { PollId: pollId } });

  req.app.get("io").to(pollId).emit("vote_update", updatedOptions);

  res.json({ success: true });
});

router.get("/:pollId", async (req, res) => {
  const Poll = require("../models/Poll");
  const Option = require("../models/Option");

  const poll = await Poll.findByPk(req.params.pollId, {
    include: Option
  });

  if (!poll) {
    return res.status(404).json({ error: "Poll not found" });
  }

  res.json({
    question: poll.question,
    options: poll.Options
  });
});

module.exports = router;
