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
const Picture = require('../models/pictures')
const MedicalHistory = require('../models/medicalHistory');
const { TopologyDescription } = require('mongodb');
const sampleTreatments = require('../scripts/sampleData/treatmentData');

const Functions = require('../scripts/functions');

const router = Router();
router.use(express.json());

const app = express();

//file transfers
const path = require('path');
const multer = require('multer');

// function copyFile(src){
//     let destDir = path.join(__dirname, '../../public/patientPic');
//     let fileName = path.basename(src);

//     let dest = path.join(destDir, fileName);

//     fs.copyFile(src, dest, (err) => {
//         if (err) {
//             console.error("Error copying file:", err);
//         } else {
//             console.log("File copied from ${src} to ${dest}");
//         }
//     });
// }

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/patientPic'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });
app.use(express.urlencoded({ extended: true }));

//upload picture
router.post('/upload-pic', upload.single('file'), (req,res) => {
    try{
        const fileName = req.file.originalname;
        const fileDate = req.body.date;
        const fileCaption = req.body.caption;
        const patientID = req.body.patientID;

        const picture = new Picture({
            fileName: fileName,
            date: fileDate,
            caption: fileCaption,
            patientID: patientID
        });

        
        picture.save().then(function(){
            if (req.file){
                return res.json({message: 'File uploaded successfully', file: req.file});
            } else {
                return res.status(400).json({ message: 'File upload failed.' });
            }
        });

        
    } catch(error){
        console.error("Error uploading picture:", error);
        res.status(500).send("Server error");
    }

    
});


//PATIENT-INFORMATION
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


        birthdate = birthyear + '-' + birthmonth + '-' + birthday; 

        let fullSex = patient.sex;

        if(fullSex = "M"){
            fullSex = "Male";
        } else {
            fullSex = "Female";
        }

        const medicalHistory = await MedicalHistory.findOne({patientID: req.params.id});

        if(medicalHistory){
            console.log('Medical history found.');
        } else {
            console.log('Medical history not found.');
        }

        res.render("C_PatientInformation", {
            id: patient.id,
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
            previous_dentist: patient.lastDentist || "N/A",
            lastDentalVisit: Functions.convertToDate(patient.lastDentalVisit) || "N/A",
            email: patient.email || "N/A",
            home_number: patient.homeNo || "N/A",
            mobile_number: patient.contact || "N/A",
            office_number: patient.officeNo || "N/A",
            fax_number: patient.faxNo || "N/A",
            guardian_name: patient.guardianName || "N/A",
            guardian_occupation: patient.guardianOccupation || "N/A",
            minor_referral_question: patient.referralName || "N/A",
            consultation: patient.consultationReason || "N/A",


            //medicalHistory
            physician_name: medicalHistory ? medicalHistory.physicianName : "N/A",
            physicianOfficeAddress: medicalHistory ? medicalHistory.physicianOfficeAddress : "N/A",
            physicianSpecialty: medicalHistory ? medicalHistory.physicianSpecialty : "N/A",
            physicianOfficeNumber: medicalHistory ? medicalHistory.physicianOfficeNumber : "N/A",
            prescription: medicalHistory ? medicalHistory.prescription : "N/A",
            illnessOrSurgery: medicalHistory ? medicalHistory.illnessOrSurgery : "N/A",
            condition: medicalHistory ? medicalHistory.condition : "N/A",
            isUsingTobacco: medicalHistory ? medicalHistory.isUsingTobacco : "N/A",
            isAlcoholOrDrugs: medicalHistory ? medicalHistory.isAlcoholOrDrugs : "N/A",
            allergies: medicalHistory ? medicalHistory.allergies : "N/A",
            isPregnant: medicalHistory ? medicalHistory.isPregnant : "N/A",
            isNursing: medicalHistory ? medicalHistory.isNursing : "N/A",
            isBirthControlPills: medicalHistory ? medicalHistory.isBirthControlPills : "N/A",
            healthProblems: medicalHistory ? medicalHistory.healthProblems : "N/A"
        });
    } catch (error) {
        console.error("Error fetching patient information:", error);
        res.status(500).send("Server error");
    }
});

// To-DO
// router.get("/to-do", async (req, res) =>{
//     try{
//         const patients = await Patient.find({isActive: true}).populate({
//             path: "treatments",
//             select: "procedure"
//         });

//         patients.forEach(patient => {
//             if (patient.effectiveDate) {
//                 const date = new Date(patient.effectiveDate);
                
//                 const month = String(date.getMonth() + 1).padStart(2, '0');
//                 const day = String(date.getDate()).padStart(2, '0');
//                 const year = String(date.getFullYear()).slice(-2); 
//                 const hours = String(date.getHours()).padStart(2, '0');
//                 const minutes = String(date.getMinutes()).padStart(2, '0');

//                 patient.formattedEffectiveDate = `${month}/${day}/${year} ${hours}:${minutes}`;
//                 // patient.formattedEffectiveDate = Functions.convertToDate
//             } else {
//                 patient.formattedEffectiveDate = "N/A";
//             }
//         });
//         res.render("B_Todo", {
//             patients,
//             appointmentCount: patients.length
//         });
//     }
//     catch(error){
//         console.log("Error getting data", error);
//         res.status(500).end("Error retrieving patient data");
//     }
// });

router.get("/to-do", async (req, res) => {
    try {
        
        const targetDate = req.query.date ? new Date(req.query.date) : new Date();
        console.log("Target date from query:", targetDate); // Debugging output

    
        targetDate.setHours(0, 0, 0, 0);

    
        const patients = await Patient.find({
            isActive: true,
            effectiveDate: {
                $gte: targetDate,
                $lt: new Date(targetDate.getTime() + 24 * 60 * 60 * 1000) 
            }
        }).populate({
            path: "treatments",
            select: "procedure"
        });

        console.log("Number of patients found for target date:", patients.length); 

        patients.forEach(patient => {
            if (patient.effectiveDate) {
                const date = new Date(patient.effectiveDate);
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                patient.formattedTime = `${hours}:${minutes}`;
            } else {
                patient.formattedTime = "N/A";
            }
        });

        
        res.render("B_Todo", {
            patients,
            appointmentCount: patients.length,
            dateDisplay: targetDate.toDateString()
        });
    } catch (error) {
        console.log("Error getting data", error);
        res.status(500).end("Error retrieving patient data");
    }
});


router.get("/treatment", (req,res) =>{
    res.render("D_Treatment");
});

router.get("/patient_list", async (req, res) => {

    try {
        const searchQuery = req.query.search || "";
        const patients = await Patient.find({ isActive: true ,
            $or:[
                { firstName: { $regex: searchQuery, $options: 'i' } },  
                { lastName: { $regex: searchQuery, $options: 'i' } }, 
                { middleName: { $regex: searchQuery, $options: 'i' } }, 
                { nickname: { $regex: searchQuery, $options: 'i' } } 
            ]
        });

        const updatedPatients = await Promise.all(patients.map(async (patient) => {
            const populatedPatient = await patient.populate({
                path: "treatments",
                options: { sort: { date: -1 }, limit: 1 }
            });

            if (populatedPatient.treatments.length > 0) {
                const latestTreatment = populatedPatient.treatments[0];
                const latestDate = Functions.convertToDate(latestTreatment.date); 
                const latestProcedure = latestTreatment.procedure;

                populatedPatient.latestTreatmentDate = latestDate;
                populatedPatient.latestProcedure = latestProcedure;
            } else {
                populatedPatient.latestTreatmentDate = "N/A";
                populatedPatient.latestProcedure = "N/A";
            }

            return populatedPatient;
        }));

        res.render("C_PatientList", {
            patients: updatedPatients,
            patientCount: updatedPatients.length
        });
    } catch (error) {
        console.log("Error getting data", error);
        res.status(500).end("Error retrieving patient data");
    }
});

//DEFAULT PAGE
router.get("/", async (req, res) =>{
    try {
        
        const targetDate = req.query.date ? new Date(req.query.date) : new Date();
        console.log("Target date from query:", targetDate); 
    
        targetDate.setHours(0, 0, 0, 0);

        const patients = await Patient.find({
            isActive: true,
            effectiveDate: {
                $gte: targetDate,
                $lt: new Date(targetDate.getTime() + 24 * 60 * 60 * 1000) 
            }
        }).populate({
            path: "treatments",
            select: "procedure"
        });

        console.log("Number of patients found for target date:", patients.length); 

        patients.forEach(patient => {
            if (patient.effectiveDate) {
                const date = new Date(patient.effectiveDate);
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                patient.formattedTime = `${hours}:${minutes}`;
            } else {
                patient.formattedTime = "N/A";
            }
        });

        
        res.render("B_Todo", {
            patients,
            appointmentCount: patients.length,
            dateDisplay: targetDate.toDateString()
        });
    } catch (error) {
        console.log("Error getting data", error);
        res.status(500).end("Error retrieving patient data");
    }
});

router.get('/patient-list', async (req, res) => {
    try {
        const uniqueProcedures = await Functions.uniqueProcedures();
        res.render('C_PatientList', { uniqueProcedures });
    } catch (error) {
        console.error('Error fetching unique procedures:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
