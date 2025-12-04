"use strict";

const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable("ProductVariants", {
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
      variantName: {
        type: DataTypes.STRING,
        allowNull: false, // VD: "50g", "100g" hoặc "Yến hũ 70ml"
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discountPrice: {
        type: DataTypes.INTEGER,
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
    await queryInterface.dropTable("ProductVariants");
  },
};
