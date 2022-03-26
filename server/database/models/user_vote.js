'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_Vote.init({
    userId: DataTypes.INTEGER,
    voteId: DataTypes.INTEGER,
    voteOption1: DataTypes.BOOLEAN,
    voteOption2: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User_Vote',
  });
  return User_Vote;
};