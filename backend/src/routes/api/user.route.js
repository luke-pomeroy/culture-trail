const express = require('express');
const router = express.Router();
const { authJwt } = require('../../middleware/auth');
const controller = require('../../controllers/user.controller');

router.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    );
    next();
});

router.get('/all', controller.allAccess);

router.get(
    '/user',
    [authJwt.verifyAccessToken],
    controller.userBoard
);

router.get(
    '/editor',
    [authJwt.verifyAccessToken, authJwt.isEditor],
    controller.moderatorBoard
);

router.get(
    '/admin',
    [authJwt.verifyAccessToken, authJwt.isAdmin],
    controller.adminBoard
);

module.exports = router;
