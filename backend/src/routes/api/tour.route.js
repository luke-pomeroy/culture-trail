const express = require('express');
const router = express.Router();
const tourController = require('../../controllers/tour.controller');
const tourValidations = require('../../validations/tour.validation');

router.get('/', tourController.getUserTours);

router.get('/:tourId', tourController.getTourById);

router.post('/', tourValidations.validateTour, tourController.createTour);

router.post('/category/:categoryId',tourValidations.validateTour, tourController.createTourFromCategory);

router.post('/:tourId/place/:placeId', tourController.addPlaceToTour);

router.put('/:tourId', tourValidations.validateTour, tourController.updateTour);

router.delete('/:tourId', tourController.deleteTour);

router.delete('/:tourId/place/:placeId', tourController.deletePlaceFromTour);

module.exports = router;
