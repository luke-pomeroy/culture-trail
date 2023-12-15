const { Role, User, UserRole, Category, Place, Media, Tour } = require('../../db/models');
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

const setup = async () => {
    console.log('\n\nSetting up....\n');
    try {

        const testCategories = [];
        const testPlaces = [];

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

        // Create roles so they can be assigned to the test users
        await Role.bulkCreate([
            { name: 'user' },
            { name: 'editor' },
            { name: 'admin' }
        ]);

        
        const testUsers = [];
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
        
        let testTour;
        for (const user of testUsers){
            // Add a valid access token for each testUser
            const accessToken = await authService.generateAccessToken(user, '1h');
            user.setDataValue('validAccessToken', accessToken);

            if(user.email.startsWith('user1@')) {
                testTour = await Tour.create({
                    userId: user.id,
                    name: 'Test Tour',

                });
                await testTour.setPlaces(testPlaces);
            }
        }

        // Save test data to process.env so it can be accessed globally for tests
        process.env['testUsers'] = testUsers;
        process.env['testCategories'] = testCategories;
        process.env['testPlaces'] = testPlaces;
        process.env['testTour'] = testTour;
        
        

    } catch (err) {
        console.log(err);
        throw err;
    }

}
module.exports = setup;