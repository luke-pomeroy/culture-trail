'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MediaLinks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mediaId: {
        type: Sequelize.INTEGER,
        references: { model: 'Media' },
        allowNull: false,
        unique: 'media_link_unique_constraint'
      },
      relatedId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: 'media_link_unique_constraint'
      },
      relatedType: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: 'media_link_unique_constraint'
      },
      order: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    },
    {
      uniqueKeys: {
        media_link_unique_constraint: {
          fields: ['mediaId', 'relatedId', 'relatedType'],
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MediaLinks');
  }
};