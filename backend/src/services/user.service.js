const { User, Role } = require('../db/models');
const bcrypt = require('bcryptjs');

const getUserByEmail = async (email) => {
    return await User.findOne({
        where: {
            email: email
        },
        include: [{
            model: Role,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }]
    });
};

const getUserById = async (userId) => {
    return await User.findOne({
        where: {
            id: userId
        },
        include: [{
            model: Role,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }]
    });
};

const createUser = async (email, password) => {
    return await  User.create({
        email: email,
        password: bcrypt.hashSync(password, 8)
    });
};

const validatePassword = (password, userPassword) => {
    return bcrypt.compareSync(
        password,
        userPassword
    );
};

module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
    validatePassword
}