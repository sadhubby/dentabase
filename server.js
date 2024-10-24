const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const handlebars = require('express-handlebars');
// import connection to mongoDB and populating
const path = require('path');
const connectToMongo = require('./src/scripts/connection.js');
const populateDatabase = require('./src/scripts/populateDatabase.js');
require('dotenv').config();

// Router
const router = require('./src/routes/router.js');

server.use(express.static(path.join(__dirname, 'public')));
server.set('view engine', 'hbs');
server.use(bodyParser.urlencoded({extended: true}));

server.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions:{
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));

server.use(router);

const port = process.env.PORT || 3000;

async function database(){
    try{
        await connectToMongo();
        await populateDatabase();

    }
    catch(error){
        console.error('Server failed to start', error);
    }
}

server.listen(port, async function(){
    await database();
    console.log(`Server running on: http://localhost:${port}`);
});

