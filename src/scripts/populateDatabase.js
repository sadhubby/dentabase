const mongoose = require('mongoose');
const connectToMongo = require('./connection.js');

const Account = require('../models/accounts.js');
const Patient = require('../models/patient.js');
const Treatment = require('../models/treatment.js');
const MedicalHistory = require('../models/medicalHistory.js');
const Picture = require('../models/pictures.js');


const sampleAccounts = require('./sampleData/accountData.js');
const samplePatients = require('./sampleData/patientData.js');
const sampleTreatments = require('./sampleData/treatmentData.js');
const sampleMedicalHistory = require('./sampleData/medicalHistoryData.js');
const samplePictures = require('./sampleData/pictureData.js');

const bycrypt = require('bcrypt');
const accounts = require('../models/accounts.js');
const saltRounds = 10;

async function dropDatabase(){
    try{
        await mongoose.connection.dropDatabase();
        console.log('Database dropped successfully');
    }
    catch (error) {
        console.erro('Error dropping database', error);
    }
}


async function hashedPassword(password){
    try{
        for(const accountData of sampleAccounts){
            const hashedPassword = await bycrypt.hash(password, saltRounds)
            return hashedPassword;
        }
    }
    catch (error){
        console.error('Error hashing password:', error);
        throw error;
    }
}

async function populateDatabase(){
    try{

        await dropDatabase();

        for (const accountData of sampleAccounts) {
            // const hashedPassword = await hashedPassword(accountData.accountPass);
            // accountData.accountPass = hashedPassword;
            const account = new Account(accountData);
            await account.save();
        }

        for (const patientData of samplePatients){
            const patient = new Patient(patientData);
            await patient.save();
        }

        for (const treatmentData of sampleTreatments){
            const treatment = new Treatment(treatmentData);
            await treatment.save();
        }

        for (const medicalHistoryData of sampleMedicalHistory){
            const medicalHistory = new MedicalHistory(medicalHistoryData);
            await medicalHistory.save();
        }
        
        for (const pictureData of samplePictures){
            const picture = new Picture(pictureData);
            await picture.save();
        }

    }
    catch (error){
        console.error('Error populating database', error);
    }
    finally{
        console.log('Population function completed');
    }
}

module.exports = populateDatabase;