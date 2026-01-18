"use strict";

const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable("CheckoutItems", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      checkoutId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "CheckoutSessions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      variantId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "ProductVariants",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      priceSnapshot: {
        // giá tại thời điểm checkout (1 sản phẩm)
        type: DataTypes.DECIMAL(15, 0),
        allowNull: false,
      },

      totalprice: {
        // price_snapshot * quantity
        type: DataTypes.DECIMAL(15, 0),
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },

      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("CheckoutItems");
  },
};
