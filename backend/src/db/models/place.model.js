'use strict';
const {
  Model
} = require('sequelize');
const placecategory = require('./placecategory.model');
module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Place.belongsTo(models.Media, { foreignKey: 'primaryMediaId', as: 'primaryMedia' });
      Place.belongsToMany(models.Category, { through: models.PlaceCategory });
      Place.belongsToMany(models.Tour, { through: models.TourPlace });
      Place.belongsToMany(models.TourTemplate, { through: models.TourTemplatePlace });
      Place.belongsToMany(models.Media, {
        through: {
          model: models.MediaLink,
          scope: {
            relatedType: 'place'
          },
          as: 'placeMedia',
          foreignKey: 'relatedId'
        }
      });
    }
  }
  Place.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'draft'
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
    primaryMediaId: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    externalLink: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    googlePlaceId: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    latitude: {
      type: DataTypes.DOUBLE,
      defaultValue: null
    },
    longitude: {
      type: DataTypes.DOUBLE,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Place',
  });
  return Place;
};