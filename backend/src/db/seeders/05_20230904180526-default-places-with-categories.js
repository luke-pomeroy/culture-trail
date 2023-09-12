'use strict';
const seedData = require('./seederData.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const getId = (data, field, value) => {
      for (let i = 0; i < data[0].length; i++) {
        if (data[0][i][field] === value) {
          return data[0][i]['id'];
        }
      }
    };

   const getImageId = async (filename) => {
    return await queryInterface.rawSelect('Media', { where: {  filename: filename }}, ['id']);
   };

   const placesInsert = [];
   for (let place of seedData.places) {
    let mediaId = await getImageId(place.primaryMediaFilename);
    placesInsert.push(
      {
        name: place.name,
        status: place.status,
        description: place.description,
        primaryMediaId: mediaId,
        externalLink: place.externalLink,
        latitude: place.latitude,
        longitude: place.longitude
      }
    );
   }

   await queryInterface.bulkInsert('Places', await placesInsert);

   const places = await queryInterface.sequelize.query(
    'SELECT id, name from PLACES;'
   );

   const categories = await queryInterface.sequelize.query(
    'SELECT id, name from CATEGORIES;'
   );

   const placeCategoriesInsert = [];
   seedData.places.forEach((place) => {
    const placeId = getId(places, 'name', place.name);
    place.categories.forEach((category) => {
      const categoryId = getId(categories, 'name', category);
      if (categoryId) {
        placeCategoriesInsert.push({placeId: placeId, categoryId: categoryId});
      }
    });
   });

   await queryInterface.bulkInsert('PlaceCategories', placeCategoriesInsert);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const placeNames = seedData.places.map((place) => place.name);
    await queryInterface.bulkDelete('Places', { name: placeNames } );
  }
};
