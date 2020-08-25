import sequelize from 'sequelize';

const { STRING, UUID} = sequelize.DataTypes;


//W teorii, sequelize.define od razu robi module.exports
export default (sequelize) => {
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
        //czy naprawdę potrzebne nam jest do czegoś imię tego człowieka? Nick chyba powinien wystarczyć?
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
    })
};

