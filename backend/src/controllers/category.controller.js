const categoryService = require("../services/category.service");

exports.getAllCategories = async (req, res) => {

    //Add pagination
    const categories = await categoryService.getAllCategories();
    res.status(200).send({status: "OK", message: 'Categories found.', data: categories});
};

exports.getCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const category = await categoryService.getCategoryById(categoryId);
        res.status(200).send({status: "OK", message: 'Category found.', data: category});

    } catch (err) {
        next(err);
    }
};

exports.createCategory = async (req, res, next) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(200).send({status: "OK", message: 'Category successfully created.', data: category});

    } catch (err) {
        next(err);
    }
};

exports.updateCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;

        const category = await categoryService.updateCategory(categoryId, req.body);
        res.status(200).send({status: "OK", message: 'Category successfully updated.', data: category});

    } catch (err) {
        next(err);
    }
};

exports.addPlaceToCategory = async (req, res, next) => {
    try {
        const { categoryId, placeId } = req.params;
        const category = await categoryService.addPlaceToCategory(categoryId, placeId);
        res.status(200).send({status: "OK", message: 'Place successfully added to category.', data: category});
    } catch (err) {
        next(err);
    }
};

exports.deletePlaceFromCategory = async (req, res, next) => {
    try {
        const { categoryId, placeId } = req.params;
        const category = await categoryService.deletePlaceFromCategory(categoryId, placeId);
        res.status(200).send({status: "OK", message: 'Place successfully removed from category.', data: category});

    } catch (err) {
        next(err);
    }
};

exports.deleteCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const category = await categoryService.deleteCategory(categoryId);
        res.status(200).send({status: "OK", message: 'Category successfully deleted.', data: category});

    } catch (err) {
        next(err);
    }
};