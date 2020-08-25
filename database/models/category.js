import sequelize, { TEXT, INTEGER, BOOLEAN, STRING } from 'sequelize';

const { UUID, INTEGER, STRING} = DataTypes;

const Category = sequelize.define('Category', {
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
});