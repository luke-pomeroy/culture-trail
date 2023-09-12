'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TourPlaces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tourId: {
        type: Sequelize.INTEGER,
        references: { model: 'Tours' },
        unique: 'tour_place_unique_constraint',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      placeId: {
        type: Sequelize.INTEGER,
        references: { model: 'Places' },
        unique: 'tour_place_unique_constraint',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      note: {
        type: Sequelize.STRING
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
        tour_place_unique_constraint: {
          fields: ['tourId', 'placeId'],
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TourPlaces');
  }
};