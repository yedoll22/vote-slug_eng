"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Comments", {
      fields: ["voteId"],
      type: "foreign key",
      name: "commented vote",
      references: {
        table: "Votes",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {},
};
