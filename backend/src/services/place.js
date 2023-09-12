const db = require('../db/models');
const { Place, Category } = require('../db/models');
const createError = require('../utils/createError');
const categoryService = require('./category');

const getAllPlaces = async () => {
    const allPlaces = await Place.findAll({
        include: [
            {association: 'primaryMedia', attributes: ['name', 'filename', 'caption', 'creditLine']},
            {model: Category}
        ]
    });
    return allPlaces; 
};

const getPlace = async (placeId) => {
    try {
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
    } catch (err) {
        throw err;
    }
};

const createPlace = async (newPlace) => {
    try {
        const place = await Place.create(newPlace);

        if (newPlace.categories) {
            const categories = await categoryService.getOrCreateCategories(newPlace.categories);
            place.addCategories(categories);
            place.dataValues.categories = categories;
        }
        console.log(place)
        return place;
    } catch (err) {
        throw err;
    }
};

const updatePlace = async (placeId, fields) => {
    try {
        const place = await getPlace(placeId);
        await place.update(fields);
        return place;

    } catch (err) {
        throw err;
    }
};

const deletePlace = async (placeId) => {
    const place = await getPlace(placeId);
    place.destroy();
    return place;
};

module.exports = {
    getAllPlaces,
    getPlace,
    createPlace,
    updatePlace,
    deletePlace
};