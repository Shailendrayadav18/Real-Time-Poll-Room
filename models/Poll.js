const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Poll = sequelize.define("Poll", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  question: DataTypes.STRING
});

module.exports = Poll;
