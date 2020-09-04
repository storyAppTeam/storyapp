import sequelize from 'sequelize';

const { UUID, INTEGER} = sequelize.DataTypes;

export default (sequelize)=> {
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