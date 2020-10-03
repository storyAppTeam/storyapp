const sequelize = require('sequelize');
const { UUID, INTEGER} = sequelize.DataTypes;

module.exports =  (sequelize)=> {
    sequelize.define('StoryRating', {
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
    })
};