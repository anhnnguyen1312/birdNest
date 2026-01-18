"use strict";

const { DataTypes: SequelizeDataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: SequelizeDataTypes.INTEGER,
      },
      username: {
        type: SequelizeDataTypes.STRING,
      },
      role: {
        type: SequelizeDataTypes.STRING,
      },
      password: {
        type: SequelizeDataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: SequelizeDataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: SequelizeDataTypes.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Users");
  },
};
