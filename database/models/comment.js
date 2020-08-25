import sequelize from 'sequelize';

const { STRING, UUID} = sequelize.DataTypes;


//W teorii, sequelize.define od razu robi module.exports
export default (sequelize) => {
    sequelize.define('Comment', {
        commentID: {
            type: UUID,
            defaultValue: sequelize.UUIDV4, 
            primaryKey: true,
            allownull: false,
        },
        author: {
            type: UUID,
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