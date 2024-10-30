// this file is essentially the api routes. 

// will be most used libraries
const express = require('express');
const Router = require('express');

// other libraries to be added based on necessity / user stories.

// mongoose models, add based on user stories

const Patient = require('../models/patient');
const Treatment = require('../models/treatment');
const Account = require('../models/accounts');

const router = Router();
router.use(express.json());

// start of patient information 
router.get("/", (req, res) => {
    
    /*
    res.render("B_Todo_test", {
        title: "B_Todo_test",
    });
   */

    
    res.render("C_PatientInformation", {
        title: "C_PatientInformation",
    });

    /*
res.render("D_Treatment", {
    title: "D_Treatment",
    });
      */
    
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
router.get("/patient-list", (req, res) =>{
    res.render("B_PatientList_page",{
        title: "Patient List"
    })
});
router.get("/patient-information", (req, res) =>{
    res.render("B_PatientInformation_page",{
        title: "Patient Information"
    })
});


router.get("/B_Todo", (req, res) =>{
    res.render("B_ToDo",{
        title: "To Do"
    })
});



module.exports = router;
