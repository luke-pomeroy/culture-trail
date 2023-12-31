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

        res.status(201).send({ status:"OK", message: 'User was successfully registered!'});

    } catch (err) {
        return next(err);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await userService.getUserByEmail(email);

        if (!user) {
            return next(createError(404, 'User not found.', {user: `user ${email} not found.`}));
        }

        const passwordIsValid = userService.validatePassword(
            password,
            user.password
        );

        if (!passwordIsValid) {
            return next(createError(404, 'Password not valid.'));
        }
        const { accessToken, refreshToken } = await authService.generateTokens(user);

        res.status(200).send({
            status: "OK",
            message: "New access and refresh token succesfully issued.",
            data: {
                user: {
                    id: user.id,
                    roles: user.Roles.map(role => role.name),
                },
                accessToken: accessToken,
                refreshToken: refreshToken
            }
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
            return next(createError(401, 'Authentication Error', {refreshToken: 'Refresh token expired.'}));
        }

        const { accessToken, refreshToken } = await authService.refreshTokens(user);

        res.status(200).send({
            status: "OK",
            message: "New access and refresh token succesfully issued.",
            data: {
                user: {
                    id: user.id,
                    roles: user.Roles.map(role => role.name),
                },
                accessToken: accessToken,
                refreshToken: refreshToken
            }
            
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