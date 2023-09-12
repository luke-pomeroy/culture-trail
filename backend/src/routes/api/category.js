const express = require('express');
const router = express.Router();
const { authJwt } = require('../../middleware/auth');
const categoryController = require('../../controllers/category');
const categoryValidations = require('../../validations/category');

router.get('/', [authJwt.verifyToken], categoryController.getAllCategories);

router.get('/:categoryId', [authJwt.verifyToken], categoryController.getCategory);

router.post('/', [authJwt.verifyToken, authJwt.isEditor], categoryController.createCategory);

router.put('/:categoryId', [authJwt.verifyToken, authJwt.isEditor], categoryController.updateCategory);

router.delete('/:categoryId', [authJwt.verifyToken, authJwt.isEditor], categoryController.deleteCategory);

module.exports = router;
