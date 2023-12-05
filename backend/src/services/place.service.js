const { Place, Category } = require('../db/models');
const createError = require('../utils/createError');
const categoryService = require('./category.service');

const getAllPlaces = async () => {
    const allPlaces = await Place.findAll({
        include: [
            {association: 'primaryMedia', attributes: ['name', 'filename', 'caption', 'creditLine']},
            {model: Category}
        ]
    });
    return allPlaces; 
};

const getPlaceById = async (placeId) => {
    const place = await Place.findByPk(placeId, {
        include: [
            {association: 'primaryMedia', attributes: ['name', 'filename', 'caption', 'creditLine']},
            {model: Category}
        ]
    });

    if (!place) {
        throw createError(404, 'Resource Not Found', 'Place not found.');
    }

    return place;

};

const createPlace = async (newPlace) => {
    const place = await Place.create(newPlace);

    if (newPlace.categories) {
        const categories = await categoryService.getOrCreateCategories(newPlace.categories);
        place.addCategories(categories);
        place.dataValues.categories = categories;
    }
    return place;

};

const updatePlace = async (placeId, fields) => {
    const place = await getPlaceById(placeId);
    await place.update(fields);
    return place;
};

const deletePlace = async (placeId) => {
    const place = await getPlaceById(placeId);
    place.destroy();
    return place;
};

module.exports = {
    getAllPlaces,
    getPlaceById,
    createPlace,
    updatePlace,
    deletePlace
};