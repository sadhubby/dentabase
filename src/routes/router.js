// this file is essentially the api routes. 

// will be most used libraries
const express = require('express');
const Router = require('express');
const mongoose = require('mongoose');
// other libraries to be added based on necessity / user stories.
const session = require('express-session');

// mongoose models, add based on user stories

const Patient = require('../models/patient');
const Treatment = require('../models/treatment');
const Account = require('../models/accounts');
const MedicalHistory = require('../models/medicalHistory');
const { TopologyDescription } = require('mongodb');
const sampleTreatments = require('../scripts/sampleData/treatmentData');

const router = Router();
router.use(express.json());

// start of patient information 

// getting patient information, thought C_PatientInformation is getting it lmfaoo

router.get("/patient-information/:id", async (req, res) => {
    try {
        const patient = await Patient.findOne({id: req.params.id}); //unique id after the thing
        const fullName = `${patient.firstName} ${patient.middleName} ${patient.lastName}`;
        
        let birthdate = patient.birthdate;
        const birthyear = birthdate.getFullYear();
        let birthmonth = birthdate.getMonth() + 1;

        if(birthmonth < 10){
            birthmonth = "0" + birthmonth;
        }

        let birthday = birthdate.getDate();
        
        if(birthday < 10){
            birthday = "0" + birthday;
        }


        birthdate = birthmonth + "/" + birthday + "/" + birthyear; 

        let fullSex = patient.sex;

        if(fullSex = "M"){
            fullSex = "Male";
        } else {
            fullSex = "Female";
        }

        res.render("C_PatientInformation", {
            title: fullName.trim(),
            full_name: fullName,
            age: patient.age,
            sex: patient.sex,
            birthdate: birthdate,
            nickname: patient.nickname || "N/A",
            fullSex: fullSex,
            home_address: patient.homeAddress || "N/A",
            occupation: patient.occupation || "N/A",
            religion: patient.religion || "N/A", 
            nationality: patient.nationality || "N/A",
            dental_insurance: patient.dentalInsurance || "N/A",
        });
    } catch (error) {
        console.error("Error fetching patient information:", error);
        res.status(500).send("Server error");
    }
});




router.get("/to-do", async (req, res) =>{
    try{
        const patients = await Patient.find({isActive: true}).populate({
            path: "treatments",
            select: "procedure"
        }); 
        // const full_name = `${patient.firstName} ${patient.lastName}`
        patients.forEach(patient => {
            if (patient.effectiveDate) {
                const date = new Date(patient.effectiveDate);
                
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const year = String(date.getFullYear()).slice(-2); 
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');

                patient.formattedEffectiveDate = `${month}/${day}/${year} ${hours}:${minutes}`;
            } else {
                patient.formattedEffectiveDate = "N/A";
            }
        });
        res.render("B_ToDo", {
            patients
        });
    }
    catch(error){
        console.log("Error getting data", error);
        res.status(500).end("Error retrieving patient data");
    }
});

router.get("/treatment", (req,res) =>{
    res.render("D_Treatment");
});
// end of patient information

router.get("/patient_list", (req, res) =>{
    try{
        Patient.find().then(function(patients){
        res.render("C_PatientList", {patients: patients});
        });
    } catch(error){
        console.log("Error getting data", error);
        res.status(500).end("Error retrieving patient data");
    }
});

module.exports = router;
