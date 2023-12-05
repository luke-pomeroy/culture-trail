const placeService = require("../services/place.service");

exports.getAllPlaces = async (req, res) => {
    const places = await placeService.getAllPlaces();
    res.status(200).send({status: "OK", message: 'Places found.', data: places});
};

exports.getPlaceById = async (req, res, next) => {
    try {
        const { placeId } = req.params;
        const place = await placeService.getPlaceById(placeId);
        res.status(200).send({status: "OK", message: 'Place found.', data: place});

    } catch (err) {
        next(err);
    }
};

exports.createPlace = async (req, res, next) => {
    try {
        const place = await placeService.createPlace(req.body);
        res.status(201).send({status: "OK", message: 'Place successfully created.', data: place});

    } catch (err) {
        next(err);
    }
};

exports.updatePlace = async (req, res, next) => {
    try {
        const { placeId } = req.params;
        const fields = req.body;
        const place = await placeService.updatePlace(placeId, fields);
        res.status(200).send({status: "OK", message: 'Place successfully updated.', data: place});

    } catch (err) {
        next(err);
    }
};

exports.deletePlace = async (req, res, next) => {
    try {
        const { placeId } = req.params;
        const place = await placeService.deletePlace(placeId);
        res.status(200).send({status: "OK", message: 'Place successfully deleted.', data: place});

    } catch (err) {
        next(err);
    }
};
