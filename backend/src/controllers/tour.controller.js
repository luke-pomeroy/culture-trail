const tourService = require("../services/tour.service");
const categoryService = require("../services/category.service");

exports.getUserTours = async (req, res) => {
    const tours = await tourService.getUserTours(req.userId);
    res.status(200).send({data: tours});
};

exports.getTourById = async (req, res, next) => {
    try {
        const { tourId } = req.params;
        const userId = req.userId;
        const tour = await tourService.getTourById(userId, tourId);
        res.status(200).send({data: tour});

    } catch (err) {
        next(err);
    }
};

exports.createTour = async (req, res, next) => {
    try {
        const userId = req.userId;
        const tour = await tourService.createTour(userId, req.body);
        res.status(200).send({data: tour});

    } catch (err) {
        next(err);
    }
};
exports.createTourFromCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const userId = req.userId;
        const category = await categoryService.getCategoryById(categoryId);
        tour = await tourService.createTour(userId, req.body);
        
        category.setPlaces(category.places);
        res.status(200).send({tour: tour});

    } catch (err) {
        next(err);
    }
}

exports.updateTour = async (req, res, next) => {
    try {
        const { tourId } = req.params;
        const fields = req.body;
        const userId = req.userId;
        const tour = await tourService.updateTour(userId, tourId, fields);
        res.status(200).send({data: tour});

    } catch (err) {
        next(err);
    }
};

exports.addPlaceToTour = async (req, res, next) => {
    try {
        const { tourId, placeId } = req.params;
        const userId = req.userId;
        console.log(tourId, placeId)
        const tour = await tourService.addPlaceToTour(userId, tourId, placeId);
        res.status(200).send(tour);

    } catch (err) {
        next(err);
    }
}

exports.deletePlaceFromTour = async (req, res, next) => {
    try {
        const { tourId, placeId } = req.params;
        const userId = req.userId;
        const category = await categoryService.deletePlaceFromTour(userId, tourId, placeId);
        res.status(200).send(tour);

    } catch (err) {
        next(err);
    }
}

exports.deleteTour = async (req, res, next) => {
    try {
        const { tourId } = req.params;
        const userId = req.userId;
        const tour = await tourService.deleteTour(userId, tourId);
        res.status(200).send({status: "OK", message: 'Category successfully deleted', data: tour});

    } catch (err) {
        next(err);
    }
};