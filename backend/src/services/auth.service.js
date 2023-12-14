const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Token } = require('../db/models');

const generateTokens = async (user) => {
    const accessToken = await generateAccessToken(user, process.env.JWT_ACCESS_LIFETIME);
    const refreshToken = await generateRefreshToken(user, process.env.JWT_REFRESH_LIFETIME);

    return { accessToken, refreshToken };
};

const generateAccessToken = async (user, expiry) => {
    return jwt.sign(
        {
            roles: user.Roles.map(role => role.name)
        },
        process.env.JWT_ACCESS_SECRET,
        {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: expiry,
            subject: user.id.toString()
        }
    );
};

const generateRefreshToken = async (user, expiry) => {
    const refreshToken = jwt.sign(
        {},
        process.env.JWT_REFRESH_SECRET,
        {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: expiry,
            subject: user.id.toString()
        }
    );
    await addTokenToWhitelist(refreshToken, user.id);
    return refreshToken;
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

const removeTokenFromWhitelistByToken = async (token) => {
    return await Token.destroy({
        where: {
            hashedToken: hashToken(token)
        }
    });
};

module.exports = {
    generateTokens,
    generateAccessToken,
    generateRefreshToken,
    refreshTokens,
    tokenInWhitelist,
    addTokenToWhitelist,
    removeTokensFromWhitelistByUserId,
    removeTokenFromWhitelistByToken
};
