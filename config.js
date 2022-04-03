require('dotenv').config();

const {
    PORT,
    MONGODB_CONNECTION_STRING,
    MONGODB_DBNAME
} = process.env

module.exports = {
    port : PORT,
    mongodb : {
        connectionString : MONGODB_CONNECTION_STRING,
        dbName : MONGODB_DBNAME
    }
};