const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const session = require('express-session');
// import connection to mongoDB and populating
const path = require('path');
const connectToMongo = require('./src/scripts/connection.js');
const populateDatabase = require('./src/scripts/populateDatabase.js');
require('dotenv').config();


const patientModel = require('./src/models/patient.js');

// Router
const router = require('./src/routes/router.js');
const { setMaxIdleHTTPParsers } = require('http');

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

async function createPatient(patientPic, patientName, patientContact, patientEmail){
    var patientID = 0;

    const lastPatient = await patientModel.findOne().sort({patientID: -1});

    if(lastPatient){
        patientID = lastPatient.patientID + 1;
    }

    const patient = patientModel({
        patientID: patientID,
        patientPic: patientPic,
        patientName: patientName,
        patientContact: patientContact,
        patientEmail: patientEmail
    })

    await patient.save().then(function(){
        console.log("Patient created.");
    })
}

async function run(){
    await createPatient("one", "bob", 12321421, "email@email");
    await createPatient("two", "bob", 12321421, "email@email");
    await createPatient("three", "bob", 12321421, "email@email");
}

//run();