const { Role } = require('../db/models');

const getRoleByName = async (name) => {
    return await Role.findOne({
        where: {
            name: name
        }
    });
}

module.exports = {
    getRoleByName
}