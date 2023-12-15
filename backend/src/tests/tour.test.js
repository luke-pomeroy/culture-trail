const request = require('supertest');
const app = require('../app');
const testUsers = global.__TEST_USERS__;
const testTours = global.__TEST_TOURS__;

describe('GET: /api/tour (getUserTours)', () => {

});

describe('GET: /api/tour/tourId (getTourById)', () => {

});

describe('POST: /api/tour (createTour)', () => {

});

describe('POST: /api/tour/category/:categoryId (createTourFromCategory)', () => {

});

describe('POST: /api/tour/:tourId/place/:placeId (addPlaceToTour)', () => {

});

describe('PUT: /api/tour/:tourId (updateTour)', () => {

});

describe('DELETE: /api/tour/:tourId (deleteTour)', () => {

});

describe('DELETE: /api/tour/:tourId/place/:placeId (deletePlaceFromTour)', () => {

});
