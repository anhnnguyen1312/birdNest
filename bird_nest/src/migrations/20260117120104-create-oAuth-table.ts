"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("OAuthAccounts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      provider: {
        type: Sequelize.ENUM("google", "facebook"),
        allowNull: false,
      },
      providerId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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

    // Add unique constraint for provider + providerId
    await queryInterface.addConstraint("OAuthAccounts", {
      fields: ["provider", "providerId"],
      type: "unique",
      name: "oauth_accounts_provider_providerId_unique",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("OAuthAccounts");
  },
};
