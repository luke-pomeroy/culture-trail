const express = require('express');
const router = express.Router();
const { authJwt } = require('../../middleware/auth');
const categoryController = require('../../controllers/category.controller');

router.get('/', categoryController.getAllCategories);

router.get('/:categoryId', categoryController.getCategory);

router.post('/', [authJwt.isEditor], categoryController.createCategory);

router.post('/:categoryId/place/:placeId', [authJwt.isEditor], categoryController.addPlaceToCategory);

router.put('/:categoryId', [authJwt.isEditor], categoryController.updateCategory);

router.delete('/:categoryId/place/:placeId', [authJwt.isEditor], categoryController.deletePlaceFromCategory);

router.delete('/:categoryId', [authJwt.isEditor], categoryController.deleteCategory);

module.exports = router;
