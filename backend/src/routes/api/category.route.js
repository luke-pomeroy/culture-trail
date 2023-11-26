const express = require('express');
const router = express.Router();
const { authJwt } = require('../../middleware/auth');
const categoryController = require('../../controllers/category.controller');
const categoryValidations = require('../../validations/category.validation');

router.get('/', [authJwt.verifyAccessToken], categoryController.getAllCategories);

router.get('/:categoryId', [authJwt.verifyAccessToken], categoryController.getCategory);

router.post('/', [authJwt.verifyAccessToken, authJwt.isEditor], categoryController.createCategory);

router.put('/:categoryId', [authJwt.verifyAccessToken, authJwt.isEditor], categoryController.updateCategory);

router.delete('/:categoryId', [authJwt.verifyAccessToken, authJwt.isEditor], categoryController.deleteCategory);

module.exports = router;
