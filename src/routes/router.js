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


router.get("/", (req, res) => {

    
    res.render("B_PatientInformation_page", {
        title: "B_PatientInformation_page",
    });
    
   
    /*
   res.render("C_Treatment", {
       title: "C_Treatment",
    });
     */
    
    /*
    
 res.render("D_Todo", {
        title: "D_Todo",
    });
*/




});

module.exports = router;
