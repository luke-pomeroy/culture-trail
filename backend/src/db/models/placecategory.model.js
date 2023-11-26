'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlaceCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PlaceCategory.belongsTo(models.Place, { onDelete: 'CASCADE' , onUpdate: 'CASCADE' });
      PlaceCategory.belongsTo(models.Category, { onDelete: 'CASCADE' , onUpdate: 'CASCADE' });
    }
  }
  PlaceCategory.init({
    placeId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    order: DataTypes.INTEGER
  }, {
    sequelize,
    name: {
      singular: 'placeCategory',
      plural: 'placeCategories'
    },
    modelName: 'PlaceCategory',
  });
  return PlaceCategory;
};