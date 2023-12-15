const { Role, User, Category, Place, Media, Tour } = require('../../db/models');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const authService = require('../../services/auth.service');

const userData = [
    {
        email: 'user1@culture-trail-test.com',
        password: 'userpassword',
        roles: ['user']
    },
    {
        email: 'user2@culture-trail-test.com',
        password: 'userpassword',
        roles: ['user']
    },
    {
        email: 'editor@culture-trail-test.com',
        password: 'editorpassword',
        roles: ['user', 'editor']
    },
    {
        email: 'admin@culture-trail-test.com',
        password: 'adminpassword',
        roles: ['user', 'editor', 'admin']
    }
];

const testRoles = [];
const testUsers = [];
const testCategories = [];
const testPlaces = [];
const testTours = [];

const setup = async () => {

    console.log('\n\nSetting up....\n');

    try {

        // Create test records for Categories and Places
        for (let i = 0; i < 6; i++) {
            const category = await Category.create({
                name: `Test Category ${i + 1}`
            });
            testCategories.push(category);
            
            const place = await Place.create({
                name: `Test Place ${i + 1}`
            });
            testPlaces.push(place);
        }

        // Add all 6 places to the first test category
        testCategories[0].setPlaces(testPlaces);

        // Create roles so they can be assigned to the test users
        const roles = await Role.bulkCreate([
            { name: 'user' },
            { name: 'editor' },
            { name: 'admin' }
        ]);
        testRoles.push(...roles);
        
        //Create test users baseed on test user data
        for (const user of userData) {
            const userRoles = await Role.findAll({
                where: {
                    name: {
                        [Op.in]: user.roles
                    }
                }
            });
            const newUser = await User.create({
                email: user.email,
                password: bcrypt.hashSync(user.password, 8)
            });

            // Set roles for user
            await newUser.setRoles(userRoles);

            // Reload the new user with Roles included
            newUser.reload({
                include: {
                    model: Role, 
                    attributes: ['id', 'name'],
                    through: {
                        attributes: []
                    }
                }
            });
            testUsers.push(newUser);
        }
        
        // Create a test tour for first user (user1)
        const testTour = await Tour.create({
            userId: testUsers[0].id,
            name: 'Test Tour',

        });

        await testTour.setPlaces(testPlaces);
        testTours.push(testTour);

        // Add a valid access token for each testUser
        for (const user of testUsers){
            const accessToken = await authService.generateAccessToken(user, '1h');
            user.setDataValue('validAccessToken', accessToken);
        }

    } catch (err) {
        console.log(err);
        throw err;
    }
};

// Save test data to global variables for access during tests and teardown
global.__TEST_ROLES__ = testRoles;
global.__TEST_USERS__ = testUsers;
global.__TEST_CATEGORIES__ = testCategories;
global.__TEST_PLACES__ = testPlaces;
global.__TEST_TOURS__ = testTours;

module.exports = setup;