const { Role } = require('../../db/models');

const setup = async () => {
    console.log('\n\nSetting up....\n');
    await Role.create({
        name: 'user'
    });
}
module.exports = setup;