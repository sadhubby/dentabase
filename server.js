const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const session = require('express-session');
// import connection to mongoDB and populating
const path = require('path');
const connectToMongo = require('./src/scripts/connection.js');
const populateDatabase = require('./src/scripts/populateDatabase.js');
const functions = require('./src/scripts/functions.js');
const patientModel = require('./src/models/patient.js');

require('dotenv').config();

// Router
const router = require('./src/routes/router.js');
const { setMaxIdleHTTPParsers } = require('http');

server.use(router);

const port = process.env.PORT || 3000;

async function database(){
    try{
        await connectToMongo();
        await populateDatabase();
        await run();

    }
    catch(error){
        console.error('Server failed to start', error);
    }
}

server.listen(port, async function(){
    await database();
    console.log(`Server running on: http://localhost:${port}`);
});


async function run(){
    await functions.createPatient(
        "John",              // firstName
        "Doe",               // lastName
        "Michael",           // middleName
        "Johnny",            // nickname
        "123 Main St",       // homeAddress
        new Date('1985-02-15'), // birthdate
        39,                  // age
        'M',                 // sex
        "Protestant",        // religion
        "Canadian",          // nationality
        "john.doe@example.com", // email
        "5555555555",       // homeNo
        "Engineer",          // occupation
        "Best Dental Ins.",  // dentalInsurance
        "5556667777",       // officeNo
        "54321",             // faxNo
        "4161234567",       // contact
        new Date('2024-11-01'), // effectiveDate
        "Jane Doe",         // guardianName
        "Doctor",            // guardianOccupation
        "Dr. Smith",         // referralName
        "Routine Checkup",   // consultationReason
        "another_picture"    // pic
    );
    await functions.createPatient(
        "Alice",             // firstName
        "Johnson",           // lastName
        "Elizabeth",         // middleName
        "Ally",              // nickname
        "456 Another St",    // homeAddress
        new Date('1992-05-20'), // birthdate
        32,                  // age
        'F',                 // sex
        "Buddhist",          // religion
        "Australian",        // nationality
        "alice.j@example.com", // email
        "9998887777",       // homeNo
        "Artist",            // occupation
        "Art Insure Co.",    // dentalInsurance
        "1112223333",       // officeNo
        "12345",            // faxNo
        "9123456789",       // contact
        new Date('2024-12-01'), // effectiveDate
        "Tom Johnson",      // guardianName
        "Artist",            // guardianOccupation
        "Dr. Alice",        // referralName
        "Cavity Check",      // consultationReason
        "third_picture"     // pic
    );

    let patient = await functions.readPatient(8);
    //console.log(patient);

    let searchTest = await functions.searchPatientName("john");
    console.log(searchTest);
}

