const express = require('express');
const router = express.Router();
const { verifySignUp } = require('../../middleware/auth');
const authController = require('../../controllers/auth');
const credentialValidations = require('../../validations/credentials');

router.post(
    '/signup',
    credentialValidations.validateCredentials,
    [
    verifySignUp.checkDuplicateEmail,
    verifySignUp.checkRoleExists
    ],
    authController.signup
);

router.post('/login', credentialValidations.validateCredentials, authController.login);

module.exports = router;