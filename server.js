const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const session = require('express-session');
// import connection to mongoDB and populating
const path = require('path');
const connectToMongo = require('./src/scripts/connection.js');
require('dotenv').config();

const port = process.env.PORT || 3000;



async function database(){
    try{
        await connectToMongo();
    }
    catch(error){
        console.error('Server failed to start', error);
    }
}

server.listen(port, async function(){
    await database();
    console.log(`Server running on: http://localhost:${port}`);
});

