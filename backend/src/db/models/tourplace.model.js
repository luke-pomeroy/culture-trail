'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TourPlace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TourPlace.belongsTo(models.Tour, { onDelete: 'CASCADE' , onUpdate: 'CASCADE' });
      TourPlace.belongsTo(models.Place, { onDelete: 'CASCADE' , onUpdate: 'CASCADE' });
    }
  }
  TourPlace.init({
    tourId: DataTypes.INTEGER,
    placeId: DataTypes.INTEGER,
    note: DataTypes.STRING,
    order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TourPlace',
  });
  return TourPlace;
};