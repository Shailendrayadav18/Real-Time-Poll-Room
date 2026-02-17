const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");
const Poll = require("./Poll");

const Option = sequelize.define("Option", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  text: DataTypes.STRING,
  votes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

Poll.hasMany(Option);
Option.belongsTo(Poll);

module.exports = Option;
