const sequelize = require('sequelize');
const { STRING, UUID} = sequelize.DataTypes;

module.export =  (sequelize) => {
    sequelize.define('Comment', {
        commentID: {
            type: UUID,
            defaultValue: sequelize.UUIDV4, 
            primaryKey: true,
            allownull: false,
        },
        storyID: {
            type: UUID,
        },
        bookID: {
            type: UUID,
        }
    })
};