const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const handlebars = require('express-handlebars');
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

server.use(express.static(path.join(__dirname, 'public')));
server.set('view engine', 'hbs');
server.use(bodyParser.urlencoded({extended: true}));

// Close browser but still logged in / no bad things happen
server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{secure: false, maxAge: 1209600000}
}));

server.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions:{
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
    helpers: {
        gt: (a, b) => a > b, // Greater than
        lt: (a, b) => a < b, // Less than
        add: (a, b) => a + b, // Addition
        subtract: (a, b) => a - b // Subtraction
    }
}));

//"C:\Users\joaqu\Pictures\kk.jpg"

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

const hbs = handlebars.create({
    helpers: {
        gt: (a, b) => a > b, // Greater than
        lt: (a, b) => a < b, // Less than
        add: (a, b) => a + b, // Addition
        subtract: (a, b) => a - b // Subtraction
    }
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
        "Dr. Dentist Person", 
        new Date('2022-12-02'), 
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
        "09123456789",       // contact
        new Date('2024-12-01'), // effectiveDate
        "Tom Johnson",      // guardianName
        "Artist",            // guardianOccupation
        "Dr. Alice",        // referralName
        "Cavity Check",      // consultationReason
        "Dr. Tooth Fairy", 
        new Date('2020-02-04'), 
        "third_picture"     // pic
    );

    let patient = await functions.readPatient(8);
    //console.log(patient);

    let searchTest = await functions.searchPatientName("john");
    //console.log(searchTest);

    await functions.deactivatePatient(6);

    await functions.updateMedicalHistory(
        6,                                   // patientID
        'Dr. Bobbity bob',                     // physicianName
        'Australia',  // physicianOfficeAddress
        'Doctoring',                               // physicianSpecialty
        5,                                   // physicianOfficeNumber
        'glass',                          // prescription
        'foot surgery',                    // illnessOrSurgery (assuming this should be an array)
        'diarrhea',                          // condition (assuming this should be an array)
        false,                                // isUsingTobacco
        true,                               // isAlcoholOrDrugs
        ['Sulfa drugs'],                // allergies
        false,                                // isPregnant
        true,                               // isNursing
        false,                                // isBirthControlPills
        ['Heart Disease', 'Angina']  // healthProblems
      );

      await functions.updateMedicalHistory(
        8,                                   // patientID
        'Dr. jason',                     // physicianName
        'america',  // physicianOfficeAddress
        'cardio',                               // physicianSpecialty
        10,                                   // physicianOfficeNumber
        'betadine',                          // prescription
        'ugly',                    // illnessOrSurgery (assuming this should be an array)
        'constipation',                          // condition (assuming this should be an array)
        true,                                // isUsingTobacco
        true,                               // isAlcoholOrDrugs
        ['Sulfa drugs', 'Penicillin'],                // allergies
        false,                                // isPregnant
        false,                               // isNursing
        false,                                // isBirthControlPills
        []  // healthProblems
      );
      
    let medicalHistory = await functions.readMedicalHistory(8);
    //console.log(medicalHistory);

    await functions.createTreatment(
        7,
        new Date('1990-01-01'),
        [4,5],
        'cleaning',
        'dr dentist',
        1000,
        1000,
        0,
        new Date('2024-02-02'),
        'ongoing',
        7
    );

    await functions.createTreatment(
        7,
        new Date('1980-02-03'),
        [6],
        'Teeth Cleaning',
        'dr dentist',
        1000,
        1000,
        0,
        new Date('2024-02-02'),
        'ongoing',
        7
    );

    await functions.createTreatment(
        7,
        new Date('1980-02-03'),
        [7, 8],
        'Braces',
        'dr dentist',
        1000,
        1000,
        0,
        new Date('2024-02-02'),
        'ongoing',
        7
    );

    
    await functions.updateTreatment(
        1,
        new Date('2023-06-06'),
        [9, 10],
        'new procedure',
        'dr hello',
        5000,
        4000,
        1000,
        new Date('2023-12-12'),
        'ongoing'
    )
    await functions.createPatient(
        "Triple",             // firstName
        "H",           // lastName
        "Paul Levesque",         // middleName
        "The Game",              // nickname
        "456 Another St",    // homeAddress
        new Date('1992-05-20'), // birthdate
        32,                  // age
        'M',                 // sex
        "Buddhist",          // religion
        "American",        // nationality
        "triple.h@example.com", // email
        "9998887777",       // homeNo
        "Artist",            // occupation
        "Art Insure Co.",    // dentalInsurance
        "1112223333",       // officeNo
        "12345",            // faxNo
        "09123456789",       // contact
        new Date('2024-12-01'), // effectiveDate
        "Tom Johnson",      // guardianName
        "Artist",            // guardianOccupation
        "Dr. Alice",        // referralName
        "Cavity Check",      // consultationReason
        "Dr. Tooth Wrestler",
        new Date('2019-01-01'),
        "third_picture"     // pic
    );
    await functions.createPatient(
        "R",             // firstName
        "Truth",           // lastName
        "John Cena's fan",         // middleName
        "The Game",              // nickname
        "456 Another St",    // homeAddress
        new Date('1992-05-20'), // birthdate
        32,                  // age
        'M',                 // sex
        "Buddhist",          // religion
        "American",        // nationality
        "the.truth@example.com", // email
        "9998887777",       // homeNo
        "Artist",            // occupation
        "Art Insure Co.",    // dentalInsurance
        "1112223333",       // officeNo
        "12345",            // faxNo
        "09123456789",       // contact
        new Date('2024-11-02'), // effectiveDate
        "Tom Johnson",      // guardianName
        "Artist",            // guardianOccupation
        "Dr. Alice",        // referralName
        "Cavity Check",      // consultationReason
        "Dr. Tooth Wrestler",
        new Date('2019-01-01'),
        "third_picture"     // pic
    );
    await functions.createTreatment(
        9,
        new Date('1990-01-01'),
        [4,5],
        'Sweeping the floor',
        'dr dentist',
        1000,
        1000,
        0,
        new Date('2024-02-02'),
        'ongoing',
        9
    );
    await functions.createPatient(
        "SETH",              // firstName
        "ROLLINS",               // lastName
        "FREAKING",           // middleName
        "The Architect",            // nickname
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
        new Date('2024-11-03'), // effectiveDate
        "Jane Doe",         // guardianName
        "Doctor",            // guardianOccupation
        "Dr. Smith",         // referralName
        "Routine Checkup",   // consultationReason
        "Dr. Dentist Person", 
        new Date('2022-12-02'), 
        "another_picture"    // pic
    );
    await functions.createPatient(
        "Rhea",              // firstName
        "Ripley",               // lastName
        "Custody of Dominik",           // middleName
        "Mami",            // nickname
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
        new Date('2024-11-03'), // effectiveDate
        "Jane Doe",         // guardianName
        "Doctor",            // guardianOccupation
        "Dr. Smith",         // referralName
        "Routine Checkup",   // consultationReason
        "Dr. Dentist Person", 
        new Date('2022-12-02'), 
        "another_picture"    // pic
    );
    await functions.createPatient(
        "Liv",              // firstName
        "Morgan",               // lastName
        "2nd Custody of Dominik",           // middleName
        "Livvy Dune",            // nickname
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
        new Date('2024-11-03'), // effectiveDate
        "Jane Doe",         // guardianName
        "Doctor",            // guardianOccupation
        "Dr. Smith",         // referralName
        "Routine Checkup",   // consultationReason
        "Dr. Dentist Person", 
        new Date('2022-12-02'), 
        "another_picture"    // pic
    );
    await functions.createPatient(
        "Dominik",              // firstName
        "Mysterio",               // lastName
        "Guerrero",           // middleName
        "Eddie's son",            // nickname
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
        new Date('2024-11-03'), // effectiveDate
        "Jane Doe",         // guardianName
        "Doctor",            // guardianOccupation
        "Dr. Smith",         // referralName
        "Routine Checkup",   // consultationReason
        "Dr. Dentist Person", 
        new Date('2022-12-02'), 
        "another_picture"    // pic
    );
    await functions.createPatient(
        "Shawn",              // firstName
        "Michaels",               // lastName
        "",           // middleName
        "Haertbreak Kid",            // nickname
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
        new Date('2024-11-03'), // effectiveDate
        "Jane Doe",         // guardianName
        "Doctor",            // guardianOccupation
        "Dr. Smith",         // referralName
        "Routine Checkup",   // consultationReason
        "Dr. Dentist Person", 
        new Date('2022-12-02'), 
        "another_picture"    // pic
    );
    await functions.createPatient(
        "Caitlyn",              // firstName
        "Kiramman",               // lastName
        "",           // middleName
        "Cupcake",            // nickname
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
        new Date('2024-11-03'), // effectiveDate
        "Jane Doe",         // guardianName
        "Doctor",            // guardianOccupation
        "Dr. Smith",         // referralName
        "Routine Checkup",   // consultationReason
        "Dr. Dentist Person", 
        new Date('2022-12-02'), 
        "another_picture"    // pic
    );
    await functions.createPatient(
        "Vi",              // firstName
        "Child of Zaun",               // lastName
        "",           // middleName
        "Cait's Ex",            // nickname
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
        new Date('2024-11-03'), // effectiveDate
        "Jane Doe",         // guardianName
        "Doctor",            // guardianOccupation
        "Dr. Smith",         // referralName
        "Routine Checkup",   // consultationReason
        "Dr. Dentist Person", 
        new Date('2022-12-02'), 
        "another_picture"    // pic
    );
    await functions.createTreatment(
        10,
        new Date('1990-01-01'),
        [4,5],
        'Become 24/7 48/7 7/11 I95 South European Champion',
        'dr dentist',
        1000,
        1000,
        0,
        new Date('2024-02-02'),
        'ongoing',
        10
    );
    let treatment = await functions.readTreatment(1);
   // console.log(treatment);

   let monthStats = await functions.getMonthlyStats(2023, 6);
  // console.log("Total Earned for Month: " + monthStats[0] + ", Num of Appointments:  " + monthStats[1]);
}

// for the password. only ran this one time but saving it just to see. will remove.
// const bcrypt = require('bcrypt');

// const plainTextPassword = "dentabase"; // Replace with your shared password
// bcrypt.hash(plainTextPassword, 10, (err, hash) => {
//     if (err) {
//         console.error('Error hashing password:', err);
//     } else {
//         console.log('Hashed password:', hash);
//     }
// });


