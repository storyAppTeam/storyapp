import Sequelize from "sequelize";

const connection = new Sequelize(process.env.DATABASE_URL);

const initializeDatabaseConnection = async () => {
    try {
        await connection.sync({alter: true});
        console.log('The database connection has been successfully established!')
        
    } catch (error) {
        console.log({
            error,
            message: 'There was a problem connecting to the database!',
        });
        throw error;
    }

}

export default initializeDatabaseConnection;

// export { User, Posts, PostCategory };