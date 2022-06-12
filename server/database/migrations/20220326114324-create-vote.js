"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Votes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      voteTitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      voteOption1: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      voteOption2: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      voteOption1Count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      voteOption2Count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Votes");
  },
};
