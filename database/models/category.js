const sequelize = require('sequelize');
const { UUID, STRING} = sequelize.DataTypes;

module.exports =  (sequelize) => {
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