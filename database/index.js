import Sequelize from 'sequelize';

const connection = new Sequelize(process.env.DATABASE_URL);

const User = connection.import("../models/User");
const Story = connection.import("./models/Story");
const Book = connection.import("./models/Book");
const Comment = connection.import("./models/Comment");
const Category = connection.import("./models/Category");
const StoryRating = connection.import("./models/StoryRating");
const BookRating = connection.import("./models/BookRating");

User.Story = User.hasMany(Story);
Story.User = Story.belongsTo(User);

User.Book = User.hasMany(Book);
Book.User = Book.belongsTo(User);

User.BookRating = User.hasMany(BookRating);
BookRating.User = BookRating.belongsTo(User);

User.StoryRating = User.hasMany(StoryRating);
StoryRating.User = StoryRating.belongsTo(User);

User.Comment = User.hasMany(Comment);
Comment.User = Comment.belongsTo(User);

User.Comment = User.hasMany(Comment);
Comment.User = Comment.belongsTo(User);

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
