import sequelize from 'sequelize';

const { UUID, STRING} = sequelize.DataTypes;

export default (sequelize) => {
    sequelize.define('Category', {
        categoryID: {
            type: UUID,
            defaultValue: sequelize.UUIDV4, 
            primaryKey: true,
            allownull: false,
        },
        name: {
            type: STRING,
            allownull: false,
        }
    })
};