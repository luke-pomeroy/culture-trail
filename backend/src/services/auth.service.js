const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Token } = require('../db/models');

const generateTokens = async (user) => {
    const accessToken = jwt.sign(
        {
            roles: user.Roles.map(role => role.name)
        },
        process.env.JWT_ACCESS_SECRET,
        {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: process.env.JWT_ACCESS_LIFETIME,
            subject: user.id.toString()
        }
    );
    const refreshToken = jwt.sign(
        {},
        process.env.JWT_REFRESH_SECRET,
        {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: process.env.JWT_REFRESH_LIFETIME,
            subject: user.id.toString()
        }
    );
    
    await addTokenToWhitelist(refreshToken, user.id);

    return { accessToken, refreshToken };
};

const refreshTokens = async (user) => {
    await removeTokensFromWhitelistByUserId(user.id);
    return await generateTokens(user);
};

const hashToken = (token) => {
    return crypto.createHash('sha512').update(token).digest('hex');
};

const tokenInWhitelist = async (token) => {
    return await Token.findOne({
        where: {
            hashedToken: hashToken(token)
        }
    });
};

const addTokenToWhitelist = async (token, userId) => {
        return await Token.create({
            userId,
            hashedToken: hashToken(token)
        });
};

const removeTokensFromWhitelistByUserId = async (userId) => {
    return await Token.destroy({
        where: {
            userId: userId
        }
    });
};

module.exports = {
    generateTokens,
    refreshTokens,
    tokenInWhitelist,
    addTokenToWhitelist,
    removeTokensFromWhitelistByUserId,
};
