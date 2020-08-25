import sequelize, { TEXT, INTEGER, BOOLEAN } from 'sequelize';

const { UUID, INTEGER} = DataTypes;

const BookRating = sequelize.define('BookRating', {
    bookID: {
        type: UUID,
        primaryKey: true,
        allownull: false,
    },
    userID: {
        type: UUID,
        primaryKey: true,
        allownull: false,
    },
    rating: {
        type: INTEGER.UNSIGNED,
        allownull: false,
    }
});