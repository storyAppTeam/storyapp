const sequelize = require('sequelize');
const { STRING, UUID} = sequelize.DataTypes;

module.export =  sequelize => {
    sequelize.define('User', {
        userID: {
            type: UUID,
            defaultValue: sequelize.UUIDV4, 
            primaryKey: true,
            allownull: false,
        },
        email: {
            type: STRING,
            allownull: false,
        },
        nickname: {
            type: STRING,
            allownull: false,
        },
        name: {
            type: STRING,
            allownull: true,
        },
        password: {
            type: STRING,
            allownull: false,
        },
        salt: {
            type: STRING,
            allownull: false,
        },
        avatar: {
            type: STRING,
            allownull: true,
        },
        language: {
            type: STRING,
            allownull: false,
        }
    }),{}
    return User;
};

