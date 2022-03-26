"use strict";
const { Model } = require("sequelize");
const user = require("./user");
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.vote.belongsTo(user);
      models.vote.belongsTo(category);
      models.vote.belongsToMany(user, {
        through: "User_Vote",
        targetKey: "id",
        foreignKey: "voteId",
      });
    }
  }
  Vote.init(
    {
      voteTitle: DataTypes.STRING,
      voteOption1: DataTypes.STRING,
      voteOption2: DataTypes.STRING,
      voteOption1Count: DataTypes.INTEGER,
      voteOption2Count: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Vote",
    }
  );
  return Vote;
};
