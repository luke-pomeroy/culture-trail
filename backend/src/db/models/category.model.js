'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsToMany(models.Place, { through: models.PlaceCategory });
      Category.belongsTo(models.Media, { foreignKey: 'primaryMediaId', as: 'primaryMedia' });
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    status: DataTypes.STRING(20),
    description: DataTypes.TEXT,
    primaryMediaId: DataTypes.INTEGER,
    symbol: DataTypes.STRING(20)
  }, {
    sequelize,
    name: {
      singular: 'category',
      plural: 'categories'
    },
    modelName: 'Category',
  });
  return Category;
};