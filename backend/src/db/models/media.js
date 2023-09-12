'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Media.hasMany(models.Category, { foreignKey: 'primaryMediaId', as: 'categoryPrimaryMedia' });
      Media.hasMany(models.Place, { foreignKey: 'primaryMediaId', as: 'placePrimaryMedia' });
      Media.hasMany(models.Tour, { foreignKey: 'primaryMediaId', as: 'tourPrimaryMedia' });
      Media.hasMany(models.TourTemplate, { foreignKey: 'primaryMediaId', as: 'tourTemplatePrimaryMedia' });
      Media.belongsToMany(models.Place, { through: models.MediaLink, scope: { relatedType: 'place' }})
    }
    
  }
  Media.init({
    name: DataTypes.STRING,
    filename: DataTypes.STRING,
    caption: DataTypes.STRING,
    creditLine: DataTypes.STRING
  }, {
    sequelize,
    name: {
      singular: 'media',
      plural: 'media'
    },
    modelName: 'Media',
  });
  return Media;
};