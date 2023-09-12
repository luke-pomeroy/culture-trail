const express = require('express');
const router = express.Router();
const { authJwt } = require('../../middleware/auth');
const placeController = require('../../controllers/place');
const placeValidations = require('../../validations/place');

router.get('/', [authJwt.verifyToken], placeController.getAllPlaces);

router.get('/:placeId', [authJwt.verifyToken], placeController.getPlace);

router.post('/', placeValidations.validatePlace, [authJwt.verifyToken, authJwt.isEditor], placeController.createPlace);

router.put('/:placeId', placeValidations.validatePlace, [authJwt.verifyToken], placeController.updatePlace);

router.delete('/:placeId', [authJwt.verifyToken], placeController.deletePlace);

module.exports = router;
