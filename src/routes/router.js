// this file is essentially the api routes. 

// will be most used libraries
const express = require('express');
const Router = require('express');

// other libraries to be added based on necessity / user stories.

// mongoose models, add based on user stories

const Patient = require('../models/patient');
const Treatment = require('../models/treatment');
const Account = require('../models/accounts');
const MedicalHistory = require('../models/medicalHistory');

const router = Router();
router.use(express.json());

// start of patient information 
router.get("/patient-information", (req, res) => {
    res.render("C_PatientInformation", {
        title: "patient-information",
    });
});

// getting patient information, thought C_PatientInformation is getting it lmfaoo
// router.get("/patient/:id", async(req, res)=>{
//     try{
//         const patient = await Patient.findOne({_id: req.params.id});
//         const full_name = `${patient.firstName} ${patient.middleName} ${patient.lastName}`;
//         const birthdate = new Date(patient.birthdate);

//         const birth_month = String(birthdate.getMonth() + 1).padStart(2, '0');
//         const birth_day = String(birthdate.getDate()).padStart(2, '0');
//         const birth_year = birthdate.getFullYear();
//     res.render("C_PatientInformation",{
//         full_name: full_name,
//         //nickname = patient.nickname,
//         age: patient.age,
//         sex: patient.sex,
//         birth_month: birth_month,
//         birth_date: birth_day,
//         birth_year: birth_year,
//         nickname: nickname,

//     });
//     }catch(error){
//         console.error(error);
//         res.status(500).send("Error");
//     }
// });



// end of patient information

module.exports = router;
