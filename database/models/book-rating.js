const sequelize = require('sequelize');
const { UUID, INTEGER} = sequelize.DataTypes;

module.exports =  (sequelize) => {
    sequelize.define('BookRating', {
        bookID: {
            type: UUID,
            primaryKey: true,
            allownull: false,
        },
        rating: {
            type: INTEGER.UNSIGNED,
            allownull: false,
        }
    })
};