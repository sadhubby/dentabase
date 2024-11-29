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
const NonPatient = require('../models/nonpatient.js');

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

router.post('/deactivate-ortho', async function(req, res){
    try{
        let orthos = req.body.orthos;

        await Promise.all(orthos.map(ortho => {
            return Functions.setOrthoInactive(ortho[0], ortho.slice(1));
        }));

        let count = await Ortho.countDocuments({isActive: true});

        return res.status(200).json({message: "Orthodontic patients successfully marked as finished.", count: count});

    } catch(error){
        console.error("Error deactivating orthodontics.", error);
        return res.status(500).json({message: "Error deactivating orthodontic patients", count: -1});
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

        const currentYear = new Date().getFullYear(); 
        const startOfYear = new Date(currentYear, 0, 1); 
        const startOfNextYear = new Date(currentYear + 1, 0, 1);

        let monthlyAppointmentsCounts = [0,0,0,0,0,0,0,0,0,0,0,0];
        
        const treatmentsOfYear = await Treatment.find({
            date: {
                $gte: startOfYear, 
                $lt: startOfNextYear
            }
        });

        let yearlyUniqueProcedures = []; // array of jsons for unique procedures
        let servicesByMonth = {};
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        months.forEach(month => {
            servicesByMonth[month + "Services"] = [];
        });
        
        treatmentsOfYear.forEach(treatment => {
            let month = treatment.date.getMonth(); // get the month number
            let procedure = treatment.procedure;
        
            // Handle unique procedures for the year
            const uniqueProcedure = yearlyUniqueProcedures.find(p => p.name === procedure);
            if (uniqueProcedure) {
                uniqueProcedure.count++; // increment if procedure already exists
            } else {
                yearlyUniqueProcedures.push({ name: procedure, count: 1 }); // create new procedure entry if not found
            }


            let procedureOfMonth;
        
            // Update monthly appointments count (e.g., total treatments for each month)
            switch (month) {
                case 0: // January
                    monthlyAppointmentsCounts[0]++;
                    
                    // Check if procedure exists in January's services
                    procedureOfMonth = servicesByMonth.JanServices.find(p => p.name === procedure);
                    if (procedureOfMonth) {
                        procedureOfMonth.count++;
                    } else {
                        servicesByMonth.JanServices.push({ name: procedure, count: 1 });
                    }
                    break;
                
                case 1: // February
                    monthlyAppointmentsCounts[1]++;
                    
                    // Check if procedure exists in February's services
                    procedureOfMonth = servicesByMonth.FebServices.find(p => p.name === procedure);
                    if (procedureOfMonth) {
                        procedureOfMonth.count++;
                    } else {
                        servicesByMonth.FebServices.push({ name: procedure, count: 1 });
                    }
                    break;
        
                case 2: // March
                    monthlyAppointmentsCounts[2]++;
                    
                    // Check if procedure exists in March's services
                    procedureOfMonth = servicesByMonth.MarServices.find(p => p.name === procedure);
                    if (procedureOfMonth) {
                        procedureOfMonth.count++;
                    } else {
                        servicesByMonth.MarServices.push({ name: procedure, count: 1 });
                    }
                    break;
        
                case 3: // April
                    monthlyAppointmentsCounts[3]++;
                    
                    // Check if procedure exists in April's services
                    procedureOfMonth = servicesByMonth.AprServices.find(p => p.name === procedure);
                    if (procedureOfMonth) {
                        procedureOfMonth.count++;
                    } else {
                        servicesByMonth.AprServices.push({ name: procedure, count: 1 });
                    }
                    break;
        
                case 4: // May
                    monthlyAppointmentsCounts[4]++;
                    
                    // Check if procedure exists in May's services
                    procedureOfMonth = servicesByMonth.MayServices.find(p => p.name === procedure);
                    if (procedureOfMonth) {
                        procedureOfMonth.count++;
                    } else {
                        servicesByMonth.MayServices.push({ name: procedure, count: 1 });
                    }
                    break;
        
                case 5: // June
                    monthlyAppointmentsCounts[5]++;
                    
                    // Check if procedure exists in June's services
                    procedureOfMonth = servicesByMonth.JunServices.find(p => p.name === procedure);
                    if (procedureOfMonth) {
                        procedureOfMonth.count++;
                    } else {
                        servicesByMonth.JunServices.push({ name: procedure, count: 1 });
                    }
                    break;
        
                case 6: // July
                    monthlyAppointmentsCounts[6]++;
                    
                    // Check if procedure exists in July's services
                    procedureOfMonth = servicesByMonth.JulServices.find(p => p.name === procedure);
                    if (procedureOfMonth) {
                        procedureOfMonth.count++;
                    } else {
                        servicesByMonth.JulServices.push({ name: procedure, count: 1 });
                    }
                    break;
        
                case 7: // August
                    monthlyAppointmentsCounts[7]++;
                    
                    // Check if procedure exists in August's services
                    procedureOfMonth = servicesByMonth.AugServices.find(p => p.name === procedure);
                    if (procedureOfMonth) {
                        procedureOfMonth.count++;
                    } else {
                        servicesByMonth.AugServices.push({ name: procedure, count: 1 });
                    }
                    break;
        
                case 8: // September
                    monthlyAppointmentsCounts[8]++;
                    
                    // Check if procedure exists in September's services
                    procedureOfMonth = servicesByMonth.SepServices.find(p => p.name === procedure);
                    if (procedureOfMonth) {
                        procedureOfMonth.count++;
                    } else {
                        servicesByMonth.SepServices.push({ name: procedure, count: 1 });
                    }
                    break;
        
                case 9: // October
                    monthlyAppointmentsCounts[9]++;
                    
                    // Check if procedure exists in October's services
                    procedureOfMonth = servicesByMonth.OctServices.find(p => p.name === procedure);
                    if (procedureOfMonth) {
                        procedureOfMonth.count++;
                    } else {
                        servicesByMonth.OctServices.push({ name: procedure, count: 1 });
                    }
                    break;
        
                case 10: // November
                    monthlyAppointmentsCounts[10]++;
                    
                    // Check if procedure exists in November's services
                    procedureOfMonth = servicesByMonth.NovServices.find(p => p.name === procedure);
                    if (procedureOfMonth) {
                        procedureOfMonth.count++;
                    } else {
                        servicesByMonth.NovServices.push({ name: procedure, count: 1 });
                    }
                    break;
        
                case 11: // December
                    monthlyAppointmentsCounts[11]++;
                    
                    // Check if procedure exists in December's services
                    procedureOfMonth = servicesByMonth.DecServices.find(p => p.name === procedure);
                    if (procedureOfMonth) {
                        procedureOfMonth.count++;
                    } else {
                        servicesByMonth.DecServices.push({ name: procedure, count: 1 });
                    }
                    break;
        
                default:
                    console.log("Invalid month"); // Fallback for invalid months
            }
        });
        
        let allServices = await Service.find();

        res.render("E_Report", {
            patients: orthodontics,
            orthoCount: orthodontics.length,
            monthlyCounts: monthlyAppointmentsCounts,
            appointmentCount: treatmentsOfYear.length,


            //for frequency distribution
            yearlyUniqueProcedures: yearlyUniqueProcedures,
            servicesByMonth: servicesByMonth,
            allServices: allServices

        });


    } catch (error) {
        console.error("Error loading report page.", error);
    }
});

///SERVICE -Information

router.post('/services', async (req, res) => {
    const { serviceName, price, type } = req.body;
    try {
        const newService = await createService(serviceName, price, type);
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/services/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const service = await readService(id);
        res.status(200).json(service);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.put('/services/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedService = await updateService(id, updates);
        res.status(200).json(updatedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
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

//also applies to get"/"
// router.get("/to-do", async (req, res) => {
//     try {
        
//         const page = parseInt(req.query.page) || 0;

//         const today = new Date();
//         today.setHours(0, 0, 0, 0); //start of today if you see in console its like a day before, thats normal, just adjusting to our timezone
//         const targetDate = new Date(today);
//         targetDate.setDate(today.getDate() + page); //adjust target date by page offset. so like today is page 0, the next day is page = 1

//         //define the start and end of the day for the target date
//         const startOfDay = new Date(targetDate);
//         const endOfDay = new Date(targetDate);
//         endOfDay.setHours(23, 59, 59, 999); // end of target date day

//         console.log("Start of day:", startOfDay);
//         console.log("End of day:", endOfDay);

//         //query patients with appointments on the target date day
//         const patients = await Patient.find({
//             isActive: true,
//             effectiveDate: {
//                 //essentially says from start to end of day si effective date. so long a withing (impossible outside), allowed.
//                 $gte: startOfDay, 
//                 $lt: endOfDay,    
//             },
//         }).populate({
//             path: "treatments",
//             select: "procedure",
//         });

//         console.log("Patients fetched for target date:", patients);

//         //format the patient data 
//         patients.forEach(patient => {
//             if (patient.effectiveDate) {
//                 const date = new Date(patient.effectiveDate);
//                 patient.formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
//             } else {
//                 patient.formattedTime = "N/A";
//             }
//         });

//         res.render("B_Todo", {
//             patients, //all patient information, just select accordingly at handlebars
//             appointmentCount: patients.length, //count of patients with appointments day of
//             dateDisplay: startOfDay.toDateString(), //date to be passed into B_Todo
//             page, //page number
//         });
//     } catch (error) {
//         console.error("Error fetching appointments:", error);
//         res.status(500).send("Error retrieving patient data.");
//     }
// });




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
// router.post('/update-effective-date', async (req, res) => {
//     console.log("Request received:", req.body); // Debug request data
//     const { patientID, effectiveDate, startTime, endTime } = req.body;

//     try {
//         const appointmentStart = new Date(`${effectiveDate}T${startTime}`);
//         const patient = await Patient.findOne({ id: patientID });
//         if (!patient) {
//             console.log("Patient not found");
//             return res.status(404).json({ message: 'Patient not found' });
//         }

//         console.log("Updating patient effectiveDate to:", appointmentStart); // Debug update
//         patient.effectiveDate = appointmentStart;
//         await patient.save();

//         console.log("Patient updated:", patient);
//         res.status(200).json({ message: 'Effective date updated successfully' });
//     } catch (error) {
//         console.error("Error updating effective date:", error);
//         res.status(500).json({ message: 'Error updating effective date' });
//     }
// });
router.post('/update-effective-date', async (req, res) => {
    const { id, effectiveDate, startTime } = req.body; // `id` is passed here

    try {
        // Combine date and time
        const updatedEffectiveDate = new Date(`${effectiveDate}T${startTime}`);

        // Find the patient by their `id` and update `effectiveDate`
        const patient = await Patient.findOne({ id }); // Match the `id` field in MongoDB
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        patient.effectiveDate = updatedEffectiveDate; // Update the effective date
        await patient.save(); // Save changes to the database

        res.status(200).json({ message: 'Added to To-Do', effectiveDate: updatedEffectiveDate });
    } catch (error) {
        console.error('Error updating effective date:', error);
        res.status(500).json({ message: 'Error updating effective date' });
    }
});

router.post('/non-patient-appointment', async (req, res) => {
    try {
        const { name, email, effectiveDate, startTime } = req.body;

        // Validate required fields
        if (!name || !email || !effectiveDate || !startTime) {
            return res.status(400).json({ message: 'All fields are required for a non-patient appointment.' });
        }

        // Create the appointment
        const appointmentStart = new Date(`${effectiveDate}T${startTime}`);
        const nonPatientAppointment = new NonPatient({
            name,
            email,
            effectiveDate: appointmentStart,
            startTime: appointmentStart,
        });

        await nonPatientAppointment.save();

        return res.status(201).json({ message: 'One-time patient appointment created successfully.' });
    } catch (error) {
        console.error('Error creating one-time patient appointment:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

router.get('/api/unique-services', async (req, res) => {
    try {
        const services = await Service.distinct('service');
        res.json(services);
    } catch (error) {
        console.error("Error fetching unique services:", error);
        res.status(500).send('Error fetching unique services');
    }
});

router.get('/api/patients-by-service', async (req, res) => {
    try {
        const service = req.query.service;
        console.log("Backend Received Service:", service);

        if (!service) {
            return res.status(400).json({ message: 'Service is required' });
        }

        const patients = await Patient.find({ isActive: true }).populate({
            path: 'treatments',
            options: { sort: { date: -1 } } 
        });

        const filteredPatients = patients.filter(patient => {
            const latestTreatment = patient.treatments[0];
            return latestTreatment && latestTreatment.procedure === service;
        });

        console.log("Backend Returning Filtered Patients:", filteredPatients);

        const formattedPatients = filteredPatients.map(patient => {
            const latestTreatment = patient.treatments[0];
            return {
                name: `${patient.firstName} ${patient.lastName}`,
                phone: patient.contact || 'N/A',
                email: patient.email || 'N/A',
                address: patient.homeAddress || 'N/A',
                lastVisit: latestTreatment?.date || 'N/A',
                lastProcedure: latestTreatment?.procedure || 'N/A',
            };
        });

        res.json(formattedPatients);
    } catch (error) {
        console.error("Error filtering patients by service:", error);
        res.status(500).send('Error filtering patients by service');
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
