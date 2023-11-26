const { Tour } = require('../db/models');
const createError = require('../utils/createError');

const getAllTours = async () => {
    const allTours = await Tour.findAll({
        include: [
            {association: 'primaryMedia', attributes: ['name', 'filename', 'caption', 'creditLine']}        ]
    });
    return allTours; 
};

const getTourById = async (tourId) => {
    try {
        const tour = await Tour.findByPk(tourId, {
            include: [
                {association: 'primaryMedia', attributes: ['name', 'filename', 'caption', 'creditLine']},            ]
        });

        if (!tour) {
            throw createError(404, 'Resource Not Found', 'Tour not found.');
        }

        return tour;
    } catch (err) {
        throw err;
    }
};

const createTour = async (newTour) => {
    try {
        const tour = await Tour.create(newTour);
        return tour;
    } catch (err) {
        throw err;
    }
};

const updateTour = async (tourId, fields) => {
    try {
        const tour = await getTourById(tourId);
        await tour.update(fields);
        return tour;

    } catch (err) {
        throw err;
    }
};

const deleteTour = async (tourId) => {
    const tour = await getTour(tourId);
    tour.destroy();
    return tour;
};

module.exports = {
    getAllTours,
    getTourById,
    createTour,
    updateTour,
    deleteTour
};