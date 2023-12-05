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
    const category = await Category.findByPk(categoryId, {
        include: { model: Place }
    });

    if (!category) {
        throw createError(404, 'Resource Not Found', 'Category not found.');
    }

    return category;

};

const getCategoryByName = async (categoryName) => {
    const category = await Category.findOne({
        where: { name: categoryName }
    });

    return category;

};

const createCategory = async (category) => {
    const newCategory = await Category.create(category);
    return newCategory;

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

const addPlaceToCategory = async (categoryId, placeId) => {
    const category = await getCategoryById(categoryId);
    await category.addPlace(Number(placeId));
    await category.reload();
    return category;
};

const deletePlaceFromCategory = async (categoryId, placeId) => {
    const category = await getCategoryById(categoryId);
    await category.removePlaces(Number(placeId));
    await category.reload();
    return category;
};

const deleteCategory = async (categoryId) => {
    const category = await getCategoryById(categoryId);
    await category.destroy();
    return category;
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    getOrCreateCategories,
    addPlaceToCategory,
    deletePlaceFromCategory,
    deleteCategory
};
