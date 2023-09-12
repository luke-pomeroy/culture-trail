const seedData = require('./seederData.json');
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
   await queryInterface.bulkInsert('Roles', seedData.roles );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const roleNames = seedData.roles.map((role) => role.name);

    // const roleIdsData = await queryInterface.sequelize.query(
    //   'SELECT id FROM roles WHERE name IN(:roleNames)',
    //   {
    //     replacements: { roleNames: roleNames }
    //   }
    // );
    // const roleIds = [];
    // roleIdsData[0].forEach((id) => roleIds.push(id.id));

    // await queryInterface.bulkDelete('UserRoles', {
    //   roleId: roleIds
    // });
    
    await queryInterface.bulkDelete('Roles', {
      name: roleNames
    });
  }
};
