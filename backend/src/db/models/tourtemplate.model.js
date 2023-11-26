'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TourTemplate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TourTemplate.belongsToMany(models.Place, { through: models.TourTemplatePlace });
      TourTemplate.belongsTo(models.Media, { foreignKey: 'primaryMediaId', as: 'primaryMedia' });
    }
  }
  TourTemplate.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    status: DataTypes.STRING(20),
    description: DataTypes.TEXT,
    primaryMediaId: DataTypes.INTEGER,
    order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TourTemplate',
  });
  return TourTemplate;
};