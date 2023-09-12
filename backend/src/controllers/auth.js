const db = require('../db/models');
const config = require('../config/auth');
const createError = require('../utils/createError');
const { User, Role } = db;

const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res, next) => {
    try {
        const user = await  User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        });
        
        // add standard 'user' role for all new users
        const role = await Role.findOne({
            where: {
                name: 'user'
            }
        });

        await user.setRoles(role);

        res.send({ message: 'User was successfully registrered!'});
    } catch (err) {
        return next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!user) {
            return next(createError(404, 'User not found.'));
        }
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return next(createError(404, 'Password not valid.'));
        }

        const token = jwt.sign(
            { id: user.id },
            config.secret,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400 //24 hours
            }
        );

        const rolesData = await user.getRoles({ attributes: ['name'] });
        let roles = [];
        rolesData.forEach((role) => roles.push(role.name));

        res.status(200).send({
            id: user.id,
            email: user.email,
            roles: roles,
            accessToken: token
        });

    } catch (err) {
        return next(err);
    }  
};