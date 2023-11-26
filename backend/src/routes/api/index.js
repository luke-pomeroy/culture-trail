const express = require('express');
const router = express.Router();
const { authJwt } = require('../../middleware/auth');
const userRouter = require('./user.route.js');
const authRouter = require('./auth.route.js');
const placeRouter = require('./place.route.js');
const categoryRouter = require('./category.route.js');

router.use('/auth', authRouter);
router.use('/test', userRouter);
router.use('/place', [authJwt.verifyAccessToken], placeRouter);
router.use('/category', categoryRouter);

module.exports = router;
