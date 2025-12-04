"use strict";

const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable("FeaturedProducts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      type: {
        type: DataTypes.ENUM("TOP", "HOT", "NEW"),
        defaultValue: "HOT",
      },
      startDate: {
        type: DataTypes.DATE,
      },
      endDate: {
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("FeaturedProducts");
  },
};
