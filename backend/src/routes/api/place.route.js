const express = require('express');
const router = express.Router();
const { authJwt } = require('../../middleware/auth');
const placeController = require('../../controllers/place.controller');
const placeValidations = require('../../validations/place.validation');

router.get('/', placeController.getAllPlaces);

router.get('/:placeId', placeController.getPlaceById);

router.post('/', placeValidations.validatePlace, [authJwt.isEditor], placeController.createPlace);

router.put('/:placeId', placeValidations.validatePlace, [authJwt.isEditor], placeController.updatePlace);

router.delete('/:placeId', [authJwt.isEditor], placeController.deletePlace);

module.exports = router;
