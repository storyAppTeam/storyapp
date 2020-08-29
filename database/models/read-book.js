import sequelize from 'sequelize';

const { UUID, INTEGER} = sequelize.DataTypes;

export default (sequelize) => {
    sequelize.define('ReadBook', {
    })
};