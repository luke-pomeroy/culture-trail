const bcrypt = require('bcryptjs');
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
    const getId = (data, field, value) => {
      for (let i = 0; i < data[0].length; i++) {
        if (data[0][i][field] === value) {
          return data[0][i]['id'];
        }
      }
    };

    
    const usersInsert = seedData.users.map((user) => ({email: user.email, password: bcrypt.hashSync(user.password, 8)}));

    await queryInterface.bulkInsert('Users', usersInsert);

    const roles = await queryInterface.sequelize.query(
      `SELECT id, name from ROLES;`
    );
    const users = await queryInterface.sequelize.query(
      `SELECT id, email from USERS;`
    );
    
    const userRoleInsert = []
    for (let i = 0; i < seedData.users.length; i++) {
      let user = seedData.users[i];
      for (let j = 0; j < user.roles.length; j++) {
        let role = user.roles[j];
        userRoleInsert.push({roleId: getId(roles, 'name', role), userId: getId(users, 'email', user.email)});
      }
    };
    await queryInterface.bulkInsert('UserRoles', userRoleInsert);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const emails = seedData.users.map((user) => user.email);


    await queryInterface.bulkDelete('Users', {
      email: emails
    });
  }
};
