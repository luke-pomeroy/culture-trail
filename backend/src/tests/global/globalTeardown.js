const { Role, User, Category, Place, Tour, Media } = require('../../db/models');
const { Op } = require('sequelize');

const testRoles = global.__TEST_ROLES__;
const testUsers = global.__TEST_USERS__;
const testMedia = global.__TEST_MEDIA__;
const testCategories = global.__TEST_CATEGORIES__;
const testPlaces = global.__TEST_PLACES__;
const testTours = global.__TEST_TOURS__;

const teardown = async () => {

    console.log('\nTearing down....\n');

    try {
    
        await User.destroy({
            where: {
                id: {
                    [Op.in]: testUsers.map(user => user.id)
                }
            }
        });

        await Role.destroy({
            where: {
                id: {
                    [Op.in]: testRoles.map(role => role.id)
                }
            }
        });
    
        await Category.destroy({
            where: {
                id: {
                    [Op.in]: testCategories.map(category => category.id)
                }
            }
        });
    
        await Place.destroy({
            where: {
                id: {
                    [Op.in]: testPlaces.map(place => place.id)
                }
            }
        });
    
        await Tour.destroy({
            where: {
                id: {
                    [Op.in]: testTours.map(tour => tour.id)
                }
            }
        });

        await Media.destroy({
            where: {
                id: {
                    [Op.in]: testMedia.map(media => media.id)
                }
            }
        });

    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = teardown;