"use strict";

const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      category: {
        type: DataTypes.STRING,
        defaultValue: "Uncategorized",
      },
      gift: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },

      discountPrice: {
        type: DataTypes.INTEGER,
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      imageUrlThumb: {
        type: DataTypes.TEXT,
      },
      imageUrlArr: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue: [],
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
    await queryInterface.dropTable("Products");
  },
};
