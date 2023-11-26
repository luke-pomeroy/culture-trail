const express = require('express');
const router = express.Router();
const { verifySignUp, authJwt } = require('../../middleware/auth');
const authController = require('../../controllers/auth.controller');
const credentialValidations = require('../../validations/credentials.validation');

router.post(
    '/register',
    credentialValidations.validateCredentials,
    verifySignUp.checkDuplicateEmail,
    authController.register
);

router.post('/login', credentialValidations.validateCredentials, authController.login);

router.post('/refresh-token', authJwt.verifyRefreshToken, authController.refreshToken);

module.exports = router;