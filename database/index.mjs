import sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const { DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_DIALECT } = process.env;

const connection = new sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
	host: DATABASE_HOST,
	dialect: DATABASE_DIALECT,
	logging: false
});
const { models } = connection;

import User from './models/user.mjs';
import Story from './models/story.mjs';
import Book from './models/book.mjs';
import Comment from './models/comment.mjs';
import Category from './models/category.mjs';
import StoryRating from './models/story-rating.mjs';
import BookRating from './models/book-rating.mjs';
import ReadStory from './models/read-story.mjs';
import ReadBook from './models/read-book.mjs';
import BookCategory from './models/book-category.mjs';
import StoryCategory from './models/story-category.mjs';


User(connection);
Story(connection);
Book(connection);
Comment(connection);
Category(connection);
StoryRating(connection);
BookRating(connection);
ReadStory(connection);
ReadBook(connection);
BookCategory(connection);
StoryCategory(connection);


models.User.hasMany(models.Story);
models.Story.belongsTo(models.User);

models.User.hasMany(models.Book);
models.Book.belongsTo(models.User);

models.User.hasMany(models.BookRating);
models.BookRating.belongsTo(models.User);

models.Book.hasMany(models.BookRating);
models.BookRating.belongsTo(models.Book);

models.User.hasMany(models.StoryRating);
models.StoryRating.belongsTo(models.User);

models.Story.hasMany(models.StoryRating);
models.StoryRating.belongsTo(models.Story);

models.User.hasMany(models.Comment);
models.Comment.belongsTo(models.User);

models.Story.hasMany(models.Comment);
models.Comment.belongsTo(models.Story);

models.Book.hasMany(models.Comment);
models.Comment.belongsTo(models.Book);

models.User.belongsToMany(models.Story, { through: models.ReadStory});
models.Story.belongsToMany(models.User, { through: models.ReadStory});

models.User.belongsToMany(models.Book, { through: models.ReadBook});
models.Book.belongsToMany(models.User, { through: models.ReadBook});

models.Book.belongsToMany(models.Category, { through: models.BookCategory});
models.Category.belongsToMany(models.Book, { through: models.BookCategory});

models.Story.belongsToMany(models.Category, { through: models.StoryCategory});
models.Category.belongsToMany(models.Story, { through: models.StoryCategory});


const initializeDatabaseConnection = async () => {
	try {
		await connection.sync({alter: true});
		console.log('The database connection has been successfully established!');
	} catch (error) {
		console.log({
			error,
			message: 'There was a problem connecting to the database!'
		});
		throw error;
	}
};

export default initializeDatabaseConnection;