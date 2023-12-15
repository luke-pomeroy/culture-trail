'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tour.belongsToMany(models.Place, { through: models.TourPlace, onDelete: 'CASCADE' , onUpdate: 'CASCADE'});
      Tour.belongsTo(models.User);
      Tour.belongsTo(models.Media, { foreignKey: 'primaryMediaId', as: 'primaryMedia' });
    }
  }
  Tour.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    primaryMediaId: DataTypes.STRING,
    completedOn: DataTypes.DATE,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tour',
  });
  return Tour;
};