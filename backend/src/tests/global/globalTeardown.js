const { Role } = require('../../db/models');

const teardown = async () => {
    console.log('\nTearing down....\n');
    //await Role.destroy({
     //   where: {
      //      name: 'user'
       // }
    //});
}

module.exports = teardown;