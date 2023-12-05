const categoryService = require("../services/category.service");
const placeService = require('../services/place.service');

exports.getAllCategories = async (req, res) => {

    //Add pagination
    const categories = await categoryService.getAllCategories();
    res.status(200).send({categories: categories});
};

exports.getCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const category = await categoryService.getCategoryById(categoryId);
        res.status(200).send({category: category});

    } catch (err) {
        next(err);
    }
};

exports.createCategory = async (req, res, next) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(200).send(category);

    } catch (err) {
        next(err);
    }
};

exports.updateCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const fields = req.body;
        const category = await categoryService.updateCategory(categoryId, fields);
        res.status(200).send(category);

    } catch (err) {
        next(err);
    }
};

exports.addPlaceToCategory = async (req, res, next) => {
    try {
        const { categoryId, placeId } = req.params;
        const category = await categoryService.addPlaceToCategory(categoryId, placeId);
        res.status(200).send(category);
    } catch (err) {
        next(err);
    }
}

exports.deletePlaceFromCategory = async (req, res, next) => {
    try {
        const { categoryId, placeId } = req.params;
        const category = await categoryService.deletePlaceFromCategory(categoryId, placeId);
        res.status(200).send(category);

    } catch (err) {
        next(err);
    }
}

exports.deleteCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const category = await categoryService.deleteCategory(categoryId);
        res.status(200).send({status: "OK", message: 'Category successfully deleted', data: category});

    } catch (err) {
        next(err);
    }
};