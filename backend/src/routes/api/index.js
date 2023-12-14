const express = require('express');
const router = express.Router();
const { authJwt } = require('../../middleware/auth');
const authRouter = require('./auth.route.js');
const placeRouter = require('./place.route.js');
const tourRouter = require('./tour.route.js');
const categoryRouter = require('./category.route.js');

router.use('/auth', authRouter);
router.use('/place', [authJwt.verifyAccessToken], placeRouter);
router.use('/tour', [authJwt.verifyAccessToken], tourRouter);
router.use('/category', [authJwt.verifyAccessToken], categoryRouter);

module.exports = router;
