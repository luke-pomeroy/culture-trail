const { Category, Place } = require('../db/models'); 
const createError = require('../utils/createError');

const getAllCategories = async () => {
    const allCategories = await Category.findAll({
        include: [
            {association: 'primaryMedia', attributes: ['name', 'filename', 'caption', 'creditLine']},
        ]
    });
    return allCategories; 
};

const getCategoryById = async (categoryId) => {
    try {
        const category = await Category.findByPk(categoryId, {
            include: { model: Place }
        });

        if (!category) {
            throw createError(404, 'Resource Not Found', 'Category not found.');
        }

        return category;

    } catch (err) {
        throw err;
    }
};

const getCategoryByName = async (categoryName) => {
    try {
        const category = await Category.findOne({
            where: { name: categoryName }
        });

        return category;
    } catch (err) {
        throw err;
    }
};

const createCategory = async (category) => {
    try {
        const newCategory = await Category.create(category);
        return newCategory;

    } catch (err) {
        throw err;
    }
};

const getOrCreateCategories = async (categories) => {
    let allCategories = [];

    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        let categoryRecord = await getCategoryByName(category);
        if (!categoryRecord) {
            categoryRecord = await createCategory({name: category});
        }
        allCategories.push(categoryRecord);
    }
    return allCategories;
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    getOrCreateCategories
};
