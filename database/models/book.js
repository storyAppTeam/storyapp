import sequelize, { TEXT, INTEGER, BOOLEAN } from 'sequelize';

const { STRING, TEXT, UUID, INTEGER, BOOLEAN} = DataTypes;

const Book = sequelize.define('Book', {
    bookID: {
        type: UUID,
        defaultValue: sequelize.UUIDV4, 
        primaryKey: true,
        allownull: false,
    },
    title: {
        type: STRING,
        allownull: false,
    },
    description: {
        type: TEXT,
        allownull: false,
    },
    content: {
        type: TEXT,
        allownull: false,
    },
    language: {
        type: STRING,
        allownull: false,
    },
    visits: {
        type: INTEGER.UNSIGNED,
    },
    likes: {
        type: INTEGER.UNSIGNED,
    },
    public: {
        type: BOOLEAN,
        allownull: false,
    },
    tags: {
        type: STRING,
        allownull: false,
    },
    cover: {
        type: STRING,
    },
    author: {
        type: UUID,
        allownull: false,
    }
});