"use strict";

const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable("Blogs", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      excerpt: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING), // PostgreSQL
        allowNull: true,
      },

      imageUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      markdown: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      publishedAt: {
        type: DataTypes.DATE,
        allowNull: true,
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
    await queryInterface.dropTable("Blogs");
  },
};
