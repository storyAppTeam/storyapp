const { Sequelize } = require("sequelize");

const {
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_DIALECT,
} = process.env;

const connection = new Sequelize(
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    dialect: DATABASE_DIALECT,
    logging: false,
  }
);

const { models } = connection;

const User = require("./models/user.js")(connection, Sequelize);
const Story = require("./models/story.js")(connection, Sequelize);
const Book = require("./models/book.js")(connection, Sequelize);
const Comment = require("./models/comment.js")(connection, Sequelize);
const Category = require("./models/category.js")(connection, Sequelize);
const StoryRating = require("./models/story-rating.js")(connection, Sequelize);
const BookRating = require("./models/book-rating.js")(connection, Sequelize);
const ReadStory = require("./models/read-story.js")(connection, Sequelize);
const ReadBook = require("./models/read-book.js")(connection, Sequelize);
const BookCategory = require("./models/book-category.js")(
  connection,
  Sequelize
);
const StoryCategory = require("./models/story-category.js")(
  connection,
  Sequelize
);

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

models.Story.hasMany(models.Comment);
models.Comment.belongsTo(models.Story);

models.Book.hasMany(models.Comment);
models.Comment.belongsTo(models.Book);

models.User.belongsToMany(models.Story, { through: models.ReadStory });
models.Story.belongsToMany(models.User, { through: models.ReadStory });

models.User.belongsToMany(models.Book, { through: models.ReadBook });
models.Book.belongsToMany(models.User, { through: models.ReadBook });

models.Book.belongsToMany(models.Category, { through: models.BookCategory });
models.Category.belongsToMany(models.Book, { through: models.BookCategory });

models.Story.belongsToMany(models.Category, { through: models.StoryCategory });
models.Category.belongsToMany(models.Story, { through: models.StoryCategory });

const initializeDatabaseConnection = async () => {
  try {
    await connection.sync({ alter: true });
    console.log("The database connection has been successfully established!");
    console.log("----------------------");
  } catch (error) {
    console.log({
      error,
      message: "There was a problem connecting to the database!",
    });
    throw error;
  }
};
initializeDatabaseConnection();


module.exports = { initializeDatabaseConnection, models };

// module.exports =  { initializeDatabaseConnection, User, Story, Book, Comment, Category, StoryRating, BookRating, ReadStory, ReadBook, BookCategory, StoryCategory, };
