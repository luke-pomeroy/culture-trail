const jwt = require('jsonwebtoken');
const config = require('../../config/auth');
const createError = require('../../utils/createError');
const { User } = require('../../db/models');

const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];

    if (!token) {
        return next(createError(403, 'Authentication Error', 'An access token must be provided'));
    }

    jwt.verify(token, 
        config.secret,
        (err, decoded) => {
            if (err) {
                return next(createError(401, 'Authentication Error', 'User not found',`There was a problem with the access token: ${err.message}`));
            }
            req.userId = decoded.id;
            next();
        });
}
const getRoles = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        if (!user) throw createError(401, 'Authentication Error', 'User not found');
        const roles = await user.getRoles();
        req.roles = roles.map((role) => role.dataValues.name );
        return next();

    } catch (err) {
        return next(err);
    }
}
const isAdmin = async (req, res, next) => {
    const roles = req.roles;
        if (roles.includes('admin')){
            return next();
        }
    
    return next(createError(403, 'User must be an administrator to access this route.'));
}

const isEditor = async (req, res, next) => {
    const roles = req.roles;
        if (roles.includes('editor')){
            return next();
        }
    
    return next(createError(403, 'User must be an editor to access this route.'));
}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: [getRoles, isAdmin],
    isEditor: [getRoles, isEditor]
}

module.exports = authJwt;

