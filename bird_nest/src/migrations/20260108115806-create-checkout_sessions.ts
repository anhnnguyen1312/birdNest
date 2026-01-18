"use strict";

const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable("CheckoutSessions", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      source: {
        type: DataTypes.ENUM("cart", "buy_now"),
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("active", "expired", "completed"),
        allowNull: false,
        defaultValue: "active",
      },

      subtotal: {
        type: DataTypes.DECIMAL(15, 0),
        allowNull: false,
      },

      shippingFee: {
        type: DataTypes.DECIMAL(15, 0),
        allowNull: false,
        defaultValue: 0,
      },

      discount: {
        type: DataTypes.DECIMAL(15, 0),
        allowNull: false,
        defaultValue: 0,
      },

      totalPrice: {
        type: DataTypes.DECIMAL(15, 0),
        allowNull: false,
      },

      expiresAt: {
        type: DataTypes.DATE,
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
    await queryInterface.dropTable("CheckoutSessions");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_CheckoutSessions_source";'
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_CheckoutSessions_status";'
    );
  },
};
