const express = require('express');
const router = express.Router();
const userRouter = require('./user.js');
const authRouter = require('./auth.js');
const placeRouter = require('./place.js');
const categoryRouter = require('./category.js');

router.use('/auth', authRouter);
router.use('/test', userRouter);
router.use('/place', placeRouter);
router.use('/category', categoryRouter);

module.exports = router;
