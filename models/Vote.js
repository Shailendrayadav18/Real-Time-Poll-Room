const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Vote = sequelize.define("Vote", {
  pollId: DataTypes.STRING,
  voterHash: DataTypes.STRING
});

module.exports = Vote;
