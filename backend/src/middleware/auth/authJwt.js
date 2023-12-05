const jwt = require('jsonwebtoken');
const createError = require('../../utils/createError');

const verifyAccessToken = (req, res, next) => {
    let token = getTokenFromRequest(req);

    if (!token) {
        return next(createError(403, 'Authentication Error', 'An access token must be provided'));
    }

    jwt.verify(token,
        process.env.JWT_ACCESS_SECRET,
        (err, decoded) => {
            if (err) {
                return next(createError(401, 'Authentication Error', 'Access token expired.'));
            }
            req.userId = Number(decoded.sub);
            req.roles = decoded.roles;
            return next();
        });
}

const verifyRefreshToken = (req, res, next) => {
    let token = getTokenFromRequest(req);

    if (!token) {
        return next(createError(403, 'Authentication Error', 'A refresh token must be provided'));
    }

    jwt.verify(token,
        process.env.JWT_REFRESH_SECRET,
        (err, decoded) => {
            if (err) {
                return next(createError(401, 'Authentication Error', 'Refresh token expired.'));
            }
            req.userId = Number(decoded.sub);
            req.token = token;
            return next();
        });
}

const getTokenFromRequest = (req) => {
    let authHeader = req.headers['authorization'];
    let token;
    if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
    }
    return token;

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
    verifyRefreshToken: verifyRefreshToken,
    verifyAccessToken: verifyAccessToken,
    isAdmin: [isAdmin],
    isEditor: [isEditor]
}

module.exports = authJwt;

