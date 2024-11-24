// this file is essentially the api routes. 

// will be most used libraries
const express = require('express');
const Router = require('express');
const mongoose = require('mongoose');
// other libraries to be added based on necessity / user stories.
const session = require('express-session');
const bcrypt = require('bcrypt');
// mongoose models, add based on user stories

const Patient = require('../models/patient');
const Ortho = require('../models/orthodontics.js');
const Treatment = require('../models/treatment');
const Service = require('../models/service.js');
const Account = require('../models/accounts');
const Picture = require('../models/pictures')
const MedicalHistory = require('../models/medicalHistory');
const { TopologyDescription } = require('mongodb');
const sampleTreatments = require('../scripts/sampleData/treatmentData');

const Functions = require('../scripts/functions');
const { uniqueProcedures } = require('../scripts/functions');

const router = Router();
router.use(express.json());

const app = express();
app.use(express.static('public'));

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

router.post('/create-patient', function(req, res){
    try{
        Functions.createPatient(
            req.body.firstName,
            req.body.lastName,
            req.body.middleName,
            req.body.nickname,
            req.body.address,
            new Date(req.body.birthdate),
            req.body.age,
            req.body.sex,
            req.body.religion,
            req.body.nationality,
            req.body.email,
            req.body.homeNo,
            req.body.occupation,
            req.body.dentalInsurance,
            req.body.officeNo,
            req.body.faxNo,
            req.body.cellNo,
            req.body.birthdate ? new Date(req.body.birthdate) : null, //temporary for effectiveDate
            req.body.guardianName,
            req.body.guardianOccupation,
            req.body.referral,
            req.body.consultationReason,
            req.body.previousDentist,
            req.body.lastDentalVisit ? new Date(req.body.birthdate) : null,
            "random pic" //placeholder for not sure pic
        ).then(function(patientID){
            console.log('Patient record created successfully with ID: ' + patientID);
            return res.status(200).json({message: "Patient record created successfully.", patientID: patientID});
        });

    } catch(error){
        console.error("Error creating patient record.", error);
        res.status(500).send("Server error");
    }
});

router.post('/create-treatment', function(req, res){
    try{
        let patientID = req.body.patientID;
        let procedureDate = req.body.procedureDate;
        let procedureName = req.body.procedureName;
        let dentistName = req.body.dentistName;
        let amountCharged = req.body.amountCharged;
        let amountPaid = req.body.amountPaid;
        let nextAppointmentDate = new Date(req.body.nextAppointmentDate);
        let teethAffected = req.body.teethAffected;

        Functions.createTreatment(
            patientID,
            procedureDate,
            teethAffected,
            procedureName,
            dentistName,
            amountCharged,
            amountPaid,
            5000, //change balance
            nextAppointmentDate,
            'ongoing'
        ).then(function(){
            console.log('Treatment record created successfully.');
            return res.status(200).send("Treatment created successfully.");
        })
    } catch(error){
        console.error("Error creating treatment record.", error);
        res.status(500).send("Server error");
    }
});

router.get("/report", async (req, res) => {
    try{
        let orthodontics = await Ortho.find({isActive: true});

        for(let ortho of orthodontics){
            let patient = await Patient.findOne({id: ortho.patientID });

            ortho.patientName = patient.firstName +" " +patient.lastName;
        }

        res.render("E_Report", {
            patients: orthodontics,
            orthoCount: orthodontics.length
        });


    } catch (error) {
        console.error("Error loading report page.", error);
    }
});


//PATIENT-INFORMATION
router.get("/patient-information/:id", async (req, res) => {
    try {
        const patient = await Patient.findOne({id: req.params.id}).populate('treatments'); //unique id after the thing
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

        const patientTreatments = patient.treatments;
        
        patientTreatments.forEach(treatment => {
            treatment.teethAffected = treatment.teethAffected.join(', ');
            treatment.dateString = Functions.convertToDate(treatment.date);
        })

        const pictures = await Picture.find({patientID: req.params.id});

        pictures.forEach(picture => {
            picture.dateString = Functions.convertToDate(picture.date);
        })

        const services = await Service.find();
        

        res.render("C_PatientInformation", {
            id: patient.id,
            title: fullName.trim(),
            full_name: fullName,
            age: patient.age,
            sex: patient.sex,
            birthdate: birthdate,
            nickname: patient.nickname,
            fullSex: fullSex,
            home_address: patient.homeAddress,
            occupation: patient.occupation,
            religion: patient.religion, 
            nationality: patient.nationality,
            dental_insurance: patient.dentalInsurance,
            previous_dentist: patient.lastDentist,
            lastDentalVisit: Functions.convertToDate(patient.lastDentalVisit),
            email: patient.email,
            home_number: patient.homeNo,
            mobile_number: patient.contact,
            office_number: patient.officeNo,
            fax_number: patient.faxNo,
            guardian_name: patient.guardianName,
            guardian_occupation: patient.guardianOccupation,
            minor_referral_question: patient.referralName,
            consultation: patient.consultationReason,


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
            healthProblems: medicalHistory ? medicalHistory.healthProblems : "N/A",


            //treatments
            treatments: patientTreatments,

            //pictures
            pictures : pictures,

            //services
            services: services
        });
    } catch (error) {
        console.error("Error fetching patient information:", error);
        res.status(500).send("Server error");
    }
});

router.post("/update-patient", async function(req, resp){
try{
    let patientSex;
    if(req.body.sex == "Male"){
        patientSex = 'M';
    } else {
        patientSex = 'F';
    }

    await Functions.updatePatientInfo(
            req.body.patientID,
            req.body.nickname,
            req.body.address,
            new Date(req.body.birthdate),
            req.body.age,
            patientSex,
            req.body.religion,
            req.body.nationality,
            req.body.email,
            req.body.homeNo,
            req.body.occupation,
            req.body.dentalInsurance,
            req.body.officeNo,
            req.body.faxNo,
            req.body.mobileNo,
            req.body.guardianName,
            req.body.guardianOccupation,
            req.body.referral,
            req.body.consultationReason,
            req.body.lastDentist,
            req.body.lastDentalVisit ? new Date(req.body.lastDentalVisit) : null,
        );
        resp.status(200).send('Patient information updated successfully');
} catch(error){
    console.error("Error updating patient info.", error);
}
    
});

router.get("/deactivate-patient", (req, res) => {
    try{
        Functions.deactivatePatient(req.body.patientID).then(function(){
            return res.status(200).json({message: "Patient deactivated successfully."});
        });
    } catch (error) {
        console.error("Error deactivating patient.", error);
        return res.status(400).json({message: 'Error deactivating patient.'});
    }
})

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

// router.get("/to-do", async (req, res) => {
//     try {
        
//         const targetDate = req.query.date ? new Date(req.query.date) : new Date();
//         console.log("Target date from query:", targetDate); // Debugging output

    
//         targetDate.setHours(0, 0, 0, 0);

    
//         const patients = await Patient.find({
//             isActive: true,
//             effectiveDate: {
//                 $gte: targetDate,
//                 $lt: new Date(targetDate.getTime() + 24 * 60 * 60 * 1000) 
//             }
//         }).populate({
//             path: "treatments",
//             select: "procedure"
//         });

//         console.log("Number of patients found for target date:", patients.length); 

//         patients.forEach(patient => {
//             if (patient.effectiveDate) {
//                 const date = new Date(patient.effectiveDate);
//                 const hours = String(date.getHours()).padStart(2, '0');
//                 const minutes = String(date.getMinutes()).padStart(2, '0');
//                 patient.formattedTime = `${hours}:${minutes}`;
//             } else {
//                 patient.formattedTime = "N/A";
//             }
//         });

        
//         res.render("B_Todo", {
//             patients,
//             appointmentCount: patients.length,
//             dateDisplay: targetDate.toDateString()
//         });
//     } catch (error) {
//         console.log("Error getting data", error);
//         res.status(500).end("Error retrieving patient data");
//     }
// });

router.get("/to-do", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0; // Default to 0 if no page is provided
        console.log("Page parameter received:", page);

        // Calculate the target date based on the page (0 = today, -1 = yesterday, etc.)
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset to the start of today
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + page); // Offset date by page number
        console.log("Target date for page:", targetDate);

        // Fetch patients with appointments on the target date
        const patients = await Patient.find({
            isActive: true,
            effectiveDate: {
                $gte: targetDate,
                $lt: new Date(targetDate.getTime() + 24 * 60 * 60 * 1000), // End of the day
            }
        }).populate({
            path: "treatments",
            select: "procedure"
        });

        console.log("Number of patients found for target date:", patients.length);

        // Format times for display
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

        // Render the To-Do page with the updated patients and date
        res.render("B_Todo", {
            patients,
            appointmentCount: patients.length,
            dateDisplay: targetDate.toDateString(), // Format and pass the date
            page // Pass the current page number back to the client
        });
    } catch (error) {
        console.log("Error getting data:", error);
        res.status(500).send("Error retrieving patient data.");
    }
});


router.get("/services",async (req,res) =>{
    try{
        let services = await Service.find();
        res.render("D_Services",{
            services: services,
            serviceCount: services.length
        });

    } catch (error){
        console.error("Error loading services page.", error);
    }
    
});


router.get("/patient_list", async (req, res) => {
    try {
        const searchQuery = req.query.search || "";
        const page = parseInt(req.query.page) || 1; 
        const limit = 10; 
        const skip = (page - 1) * limit; 

        const services = await Service.find();

        // Query to find patients
        const patients = await Patient.find({ 
            isActive: true,
            $or: [
                { firstName: { $regex: searchQuery, $options: 'i' } },
                { lastName: { $regex: searchQuery, $options: 'i' } },
                { middleName: { $regex: searchQuery, $options: 'i' } },
                { nickname: { $regex: searchQuery, $options: 'i' } }
            ]
        })
        .skip(skip)
        .limit(limit);

        const totalPatients = await Patient.countDocuments({
            isActive: true,
            $or: [
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

        const totalPages = Math.ceil(totalPatients / limit);

        res.render("C_PatientList", {
            patients: updatedPatients,
            patientCount: totalPatients,
            currentPage: page,
            totalPages: totalPages,

            services: services
        });
    } catch (error) {
        console.log("Error getting data", error);
        res.status(500).end("Error retrieving patient data");
    }
});

//DEFAULT PAGE
// router.get("/", async (req, res) =>{
//     try {
        
//         const targetDate = req.query.date ? new Date(req.query.date) : new Date();
//         console.log("Target date from query:", targetDate); 
    
//         targetDate.setHours(0, 0, 0, 0);

//         const patients = await Patient.find({
//             isActive: true,
//             effectiveDate: {
//                 $gte: targetDate,
//                 $lt: new Date(targetDate.getTime() + 24 * 60 * 60 * 1000) 
//             }
//         }).populate({
//             path: "treatments",
//             select: "procedure"
//         });

//         console.log("Number of patients found for target date:", patients.length); 

//         patients.forEach(patient => {
//             if (patient.effectiveDate) {
//                 const date = new Date(patient.effectiveDate);
//                 const hours = String(date.getHours()).padStart(2, '0');
//                 const minutes = String(date.getMinutes()).padStart(2, '0');
//                 patient.formattedTime = `${hours}:${minutes}`;
//             } else {
//                 patient.formattedTime = "N/A";
//             }
//         });

        
//         res.render("B_Todo", {
//             patients,
//             appointmentCount: patients.length,
//             dateDisplay: targetDate.toDateString()
//         });
//     } catch (error) {
//         console.log("Error getting data", error);
//         res.status(500).end("Error retrieving patient data");
//     }
// });

router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0; // Default to page 0 if no page is provided
        console.log("Page parameter received:", page);

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Start of the current day

        // Calculate target date by adding/subtracting days based on the page number
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + page); // Offset by the page number
        console.log("Target date for page:", targetDate);

        // Fetch patients for the specific target date
        const patients = await Patient.find({
            isActive: true,
            effectiveDate: {
                $gte: targetDate,
                $lt: new Date(targetDate.getTime() + 24 * 60 * 60 * 1000) // End of the day
            }
        }).populate({
            path: "treatments",
            select: "procedure"
        });

        console.log("Number of patients found for target date:", patients.length);

        // Format times for display
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

        // Render the page with the filtered patients and target date
        res.render("B_Todo", {
            patients,
            appointmentCount: patients.length,
            dateDisplay: targetDate.toDateString(), // Displayed date
            page // Pass the current page number
        });
    } catch (error) {
        console.log("Error getting data:", error);
        res.status(500).end("Error retrieving patient data");
    }
});


router.get('/api/unique-procedures', async (req, res) => {
    try {
        const uniqueProcedures = await treatmentModel.distinct('procedure');
        res.json(uniqueProcedures);
    } catch (error) {
        res.status(500).send('Error fetching unique procedures');
    }
});

router.get('/api/patients', async (req, res) => {
    try {
        const { procedure } = req.query;
        const patients = await getPatientsByProcedure(procedure);
        res.json(patients);
    } catch (error) {
        res.status(500).send('Error fetching patients');
    }
});

router.post("/update-medical-history", async function(req, res){
    try{
        let {
            patientID,
            physicianName,
            physicianOfficeAddress,
            physicianSpecialty,
            physicianOfficeNumber,
            
            prescription,
            illnessOrSurgery,
            medicalTreatment,
            isTobacco,
            isAlcohol,
            allergies,

            isPregnant,
            isNursing,
            isBirthControl,

            healthProblems
        } = req.body;

        await Functions.updateMedicalHistory(
            patientID,
            physicianName,
            physicianOfficeAddress,
            physicianSpecialty,

            physicianOfficeNumber,
            
            medicalTreatment,
            illnessOrSurgery,
            prescription,
            isTobacco,
            isAlcohol,
            allergies,

            isPregnant,
            isNursing,
            isBirthControl,

            healthProblems
        )

        res.status(200).send('Updating medical history successful');
    } catch(error){
        console.error("Error updating medical history. ", error);
        res.status(500).send('Error updating medical history');
    }
});

router.post("/appointments", async (req, res) => {
    try {
        const { patientID, date, startTime, endTime, procedure, dentist } = req.body;

        // Combine date with start and end times to create Date objects for the appointment times
        const appointmentDate = new Date(date);
        const startDateTime = new Date(appointmentDate.setHours(...startTime.split(':')));
        const endDateTime = new Date(appointmentDate.setHours(...endTime.split(':')));

        // Call createAppointment function
        await createAppointment(patientID, startDateTime, endDateTime, procedure, dentist);

        res.status(201).json({ message: "Appointment created successfully" });
    } catch (error) {
        console.error("Error creating appointment:", error);
        res.status(500).json({ message: "Error creating appointment" });
    }
});
// router.get('/appointments', async (req, res) => {
//     try {
//         const targetDate = req.query.date ? new Date(req.query.date) : new Date();
//         targetDate.setHours(0, 0, 0, 0);

//         const appointments = await Patient.find({
//             isActive: true,
//             effectiveDate: {
//                 $gte: targetDate,
//                 $lt: new Date(targetDate.getTime() + 24 * 60 * 60 * 1000)
//             }
//         }).populate('treatments', 'procedure');

//         // Send JSON data for AJAX to process
//         res.json(appointments);
//     } catch (error) {
//         console.error('Error fetching appointments:', error);
//         res.status(500).json({ error: 'Error retrieving patient data' });
//     }
// });

// router.post("/create-appointment", async (req, res) => {
//     try {
//         const { treatment, patientName, email, phone, date, startTime, endTime, nextAppointmentDate } = req.body;

//         const appointmentDate = new Date(`${date}T${startTime}`);

//         const newTreatment = new Treatment({
//             id: /* generate or provide an ID */,
//             date: appointmentDate,
//             procedure: treatment,
//             dentist: "Your Dentist Name", // Fetch or set as needed
//             nextAppointmentDate: appointmentDate, // Using the calculated date-time
//             status: "ongoing"
//             // Add other fields as necessary
//         });

//         await newTreatment.save();
//         res.status(201).json({ message: "Appointment created successfully" });
//     } catch (error) {
//         console.error("Error creating appointment:", error);
//         res.status(500).json({ message: "Failed to create appointment" });
//     }
// });






router.get("/report", (req,res) =>{
    res.render("E_Report");
});




router.get('/login', (req, res) => {
    res.render('A_LoginPage'); 
});

router.post('/login', async (req, res) => {
    const { password } = req.body;

    try {
        const sharedHash = process.env.SHARED_PASSWORD_HASH;

        const isMatch = await bcrypt.compare(password, sharedHash);

        if (isMatch) {
            res.status(200).send('Login successful!');
        } else {
            res.status(400).send('Invalid password');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('An error occurred');
    }
});


module.exports = router;
