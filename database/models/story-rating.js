import sequelize, { TEXT, INTEGER, BOOLEAN } from 'sequelize';

const { UUID, INTEGER} = DataTypes;

const StoryRating = sequelize.define('StoryRating', {
    storyID: {
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