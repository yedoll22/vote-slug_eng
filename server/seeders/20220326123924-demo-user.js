"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Votes", [
      {
        userId: 1,
        categoryId: 1,
        voteTitle: "Hello",
        voteOption1: "sample",
        voteOption2: "sample2",
        voteOption1Count: 3,
        voteOption2Count: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Votes", null, {});
  },
};
