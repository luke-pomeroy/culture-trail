const categoryService = require("../services/category");

exports.getAllCategories = async (req, res) => {
    const categories = await categoryService.getAllCategories();
    res.status(200).send({data: categories});
};

exports.getCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const category = await categoryService.getCategory(categoryId);
        res.status(200).send({data: category});

    } catch (err) {
        next(err);
    }
};

exports.createCategory = async (req, res, next) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(200).send({data: category});

    } catch (err) {
        next(err);
    }
};

exports.updateCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const fields = req.body;
        const category = await categoryService.updateCategory(categoryId, fields);
        res.status(200).send({data: category});

    } catch (err) {
        next(err);
    }
};

exports.deleteCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const category = await categoryService.deleteCategory(categoryId);
        res.status(200).send({status: "OK", message: 'Category successfully deleted', data: category});

    } catch (err) {
        next(err);
    }
};