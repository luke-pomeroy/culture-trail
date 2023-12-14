const { Media, Place, Category, Tour } = require('../db/models');
const createError = require('../utils/createError');
const categoryService = require('./category.service');

const getAllMedia = async () => {
    const allMedia = await Media.findAll();
    return allMedia; 
};

const getMediaById = async (mediaId) => {
    const media = await Media.findByPk(mediaId, {
        include: [
            {model: Place},
            {model: Category},
            {model: Tour}
        ]
    });

    if (!media) {
        throw createError(404, 'Resource Not Found', 'Media not found.');
    }

    return media;

};

const createMedia = async (newMedia) => {
    const media = await Media.create(newMedia);
    return media;

};

const updateMedia = async (mediaId, fields) => {
    const media = await getMediaById(mediaId);
    await media.update(fields);
    return media;
};

const deleteMedia = async (mediaId) => {
    const media = await getMediaById(mediaId);
    media.destroy();
    return media;
};

module.exports = {
    getAllMedia,
    getMediaById,
    createMedia,
    updateMedia,
    deleteMedia
};