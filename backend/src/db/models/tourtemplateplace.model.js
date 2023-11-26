'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TourTemplatePlace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TourTemplatePlace.init({
    tourTemplateId: DataTypes.INTEGER,
    placeId: DataTypes.INTEGER,
    note: DataTypes.STRING,
    order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TourTemplatePlace',
  });
  return TourTemplatePlace;
};