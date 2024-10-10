const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;

async function connectToMongo(dbName = process.env.DB_NAME){
    try{
        await mongoose.connect(mongoURI, {dbName});
        console.log(`Connected to database: ${dbName}`);
    }
    catch(error){
        console.log('Error connecting to MongoDB', error);
    }
};
function handler(){
    console.log("Database: Closing MongoDB connection...");
    mongoose.disconnect().then(() => {
        process.exit();
    }).catch(error =>{
        console.error('Database: Error disconnecting', error);
        process.exit(1);
    })
}

process.on("SIGINT", handler);
process.on("SIGTERM", handler);
process.on("SIGQUIT", handler);

module.exports = connectToMongo;