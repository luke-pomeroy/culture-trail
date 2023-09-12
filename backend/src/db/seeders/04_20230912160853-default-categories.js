'use strict';
const seedData = require('./seederData.json');

const categories = [];

seedData.places.forEach((place) => {
  place.categories.forEach((category) => {;
    if (!categories.includes(category)) {
      categories.push(category);
    }
  });
});

console.log();

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
   const categoryInsert = categories.map((category) => ({ name: category }));
   await queryInterface.bulkInsert('Categories', categoryInsert);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', { name: categories });
  }
};
