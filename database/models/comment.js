import sequelize from 'sequelize';

const { STRING, UUID} = sequelize.DataTypes;

export default (sequelize) => {
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