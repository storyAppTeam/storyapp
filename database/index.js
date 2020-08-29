import sequelize from 'sequelize';

const connection = new sequelize(process.env.DATABASE_URL);

import User from './models/user.js';
import Story from './models/story.js';
import Book from './models/book.js';
import Comment from './models/comment.js';
import Category from './models/category.js';
import StoryRating from './models/story-rating.js';
import BookRating from './models/book-rating.js';
import ReadStory from './models/read-story.js';
import ReadBook from './models/read-book.js';


User(connection);
Story(connection);
Book(connection);
Comment(connection);
Category(connection);
StoryRating(connection);
BookRating(connection);
ReadStory(connection);
ReadBook(connection);

connection.models.User.hasMany(connection.models.Story);
connection.models.Story.belongsTo(connection.models.User);

connection.models.User.hasMany(connection.models.Book);
connection.models.Book.belongsTo(connection.models.User);

connection.models.User.hasMany(connection.models.BookRating);
connection.models.BookRating.belongsTo(connection.models.User);

connection.models.Book.hasMany(connection.models.BookRating);
connection.models.BookRating.belongsTo(connection.models.Book);

connection.models.User.hasMany(connection.models.StoryRating);
connection.models.StoryRating.belongsTo(connection.models.User);

connection.models.Story.hasMany(connection.models.StoryRating);
connection.models.StoryRating.belongsTo(connection.models.Story);

connection.models.User.hasMany(connection.models.Comment);
connection.models.Comment.belongsTo(connection.models.User);

connection.models.Story.hasMany(connection.models.Comment);
connection.models.Comment.belongsTo(connection.models.Story);

connection.models.Book.hasMany(connection.models.Comment);
connection.models.Comment.belongsTo(connection.models.Book);

connection.models.User.belongsToMany(connection.models.Story, { through: connection.models.ReadStory});
connection.models.Story.belongsToMany(connection.models.User, { through: connection.models.ReadStory});

connection.models.User.belongsToMany(connection.models.Book, { through: connection.models.ReadBook});
connection.models.Book.belongsToMany(connection.models.User, { through: connection.models.ReadBook});

connection.models.Book.belongsToMany(connection.models.Category, { through: 'BookCategories'});
connection.models.Category.belongsToMany(connection.models.Book, { through: 'BookCategories'});

connection.models.Story.belongsToMany(connection.models.Category, { through: 'StoryCategories'});
connection.models.Category.belongsToMany(connection.models.Story, { through: 'StoryCategories'});


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
