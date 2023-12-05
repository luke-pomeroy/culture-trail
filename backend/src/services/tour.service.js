const { Tour, Place } = require('../db/models');
const createError = require('../utils/createError');

const getUserTours = async (userId) => {
    const allTours = await Tour.findAll({
        where: {
            userId: userId
        },
        include: [
            {association: 'primaryMedia', attributes: ['name', 'filename', 'caption', 'creditLine']}      
        ]
    });

    return allTours;
};

const getTourById = async (userId, tourId) => {
    const tour = await Tour.findOne({
        where: {
            id: tourId,
            userId: userId
        },
        include: [
            {association: 'primaryMedia', attributes: ['name', 'filename', 'caption', 'creditLine']},
            {model: Place}          
        ]
    });

    if (!tour) {
        throw createError(404, 'Resource Not Found', 'Tour not found.');
    }

    return tour;

};

const createTour = async (userId, newTour) => {
    const tour = await Tour.create({
        userId: userId,
        ...newTour
    });

    return tour;
};

const addPlaceToTour = async (userId, tourId, placeId) => {
    const tour = await getTourById(userId, tourId);

    await tour.addPlace(Number(placeId));
    await tour.reload();

    return tour;
};

const deletePlaceFromTour = async (userId, tourId, placeId) => {
    const tour = await getTourById(userId, tourId);

    await tour.removePlace(Number(placeId));
    await tour.reload();

    return tour;
};

const updateTour = async (userId, tourId, fields) => {
    const tour = await getTourById(userId, tourId);

    await tour.update(fields);

    return tour;
};

const deleteTour = async (userId, tourId) => {
    const tour = await getTour(userId, tourId);

    await tour.destroy();

    return tour;
};

module.exports = {
    getUserTours,
    getTourById,
    createTour,
    updateTour,
    addPlaceToTour,
    deletePlaceFromTour,
    deleteTour
};