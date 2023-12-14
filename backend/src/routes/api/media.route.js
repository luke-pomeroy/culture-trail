const express = require('express');
const router = express.Router();
const { authJwt } = require('../../middleware/auth');
const mediaController = require('../../controllers/media.controller');
const mediaValidations = require('../../validations/media.validation');

router.get('/', mediaController.getAllMedia);

router.get('/:mediaId', mediaController.getMediaById);

router.post('/', mediaValidations.validatMedia, [authJwt.isEditor], mediaController.createMedia);

router.put('/:mediaId', mediaValidations.validateMedia, [authJwt.isEditor], mediaController.updateMedia);

router.delete('/:mediaId', [authJwt.isEditor], mediaController.deleteMedia);

module.exports = router;
