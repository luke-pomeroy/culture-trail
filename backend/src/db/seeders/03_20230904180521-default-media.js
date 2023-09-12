'use strict';

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
    await queryInterface.bulkInsert('Media', [
      {
        name: 'Glasgow Botanic Gardens',
        filename: 'ricardo-mena-6kD24Hp7pkE-unsplash.jpg',
        caption: 'Overall view of Botanic Gardens',
        creditLine: 'Ricardo Mena'
      },
      {
        name: 'People\'s Palace and Winter Gardens',
        filename: 'pascal-bernardon-XRGmBLs8mBo-unsplash.jpg',
        caption: 'Overall view of People\'s Palace and Winter Gardens',
        creditLine: 'Pascal Bernardon'
      },
      {
        name: 'Tolbooth Steeple',
        filename: 'pexels-anna-urlapova-3035106.jpg',
        caption: 'Overall view of the Tolbooth Steeple',
        creditLine: 'Anna Urlapova'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Media', {
       filename: [
        'ricardo-mena-6kD24Hp7pkE-unsplash.jpg',
        'pascal-bernardon-XRGmBLs8mBo-unsplash.jpg',
        'pexels-anna-urlapova-3035106.jpg'
      ]
    });
  }
};
