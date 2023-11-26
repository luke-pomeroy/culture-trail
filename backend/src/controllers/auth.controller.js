const createError = require('../utils/createError');

const userService = require('../services/user.service');
const authService = require('../services/auth.service');
const roleService = require('../services/role.service');

const register = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await userService.createUser(email, password);
        
        // add standard 'user' role for all new users
        const role = await roleService.getRoleByName('user');
        await user.setRoles(role);

        res.send({ message: 'User was successfully registrered!'});

    } catch (err) {
        return next(err);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await userService.getUserByEmail(email);

        if (!user) {
            return next(createError(404, 'User not found.'));
        }

        const passwordIsValid = userService.validatePassword(
            password,
            user.password
        );

        if (!passwordIsValid) {
            return next(createError(404, 'Password not valid.'));
        }
        console.log(user)
        const { accessToken, refreshToken } = await authService.generateTokens(user);

        res.status(200).send({
            user: {
                id: user.id,
                roles: user.Roles.map(role => role.name),
            },
            accessToken: accessToken,
            refreshToken: refreshToken
        });

    } catch (err) {
        return next(err);
    }  
};

const refreshToken = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.userId);
        if (!user) {
            return next(createError(404, 'User not found.'));
        }

        const tokenInWhitelist = await authService.tokenInWhitelist(req.token);
        if(!tokenInWhitelist) {
            return next(createError(401, 'Authentication Error', 'Refresh Token is not valid.'));
        }

        const { accessToken, refreshToken } = await authService.refreshTokens(user);

        res.status(200).send({
            accessToken: accessToken,
            refreshToken: refreshToken
        });

    } catch (err) {
        return next(err);
    }
};

module.exports = {
    register,
    login,
    refreshToken
}