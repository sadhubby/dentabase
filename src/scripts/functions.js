const patientModel = require('../models/patient.js');
const medicalHistoryModel = require('../models/medicalHistory.js');
const treatmentModel = require('../models/treatment.js');
const orthoModel = require('../models/orthodontics.js');
const serviceModel = require('../models/service.js');


function convertToDate(birthdate){
    if(birthdate){
        let birthyear = birthdate.getUTCFullYear();
        let birthmonth = birthdate.getUTCMonth() + 1;
        
        if(birthmonth < 10){
            birthmonth = "0" + birthmonth;
        }

        let birthday = birthdate.getUTCDate();

        if(birthday < 10){
            birthday = "0" + birthday;
        }

        birthdate = birthyear + '-' + birthmonth + '-' + birthday;         
    }


    return birthdate;
}

async function createOrtho(patientID, service){
    try{
        let ortho = new orthoModel({
            patientID: patientID,
            service: service
        });

        await ortho.save();

            
        console.log("Orthodontics document successfully created.");
    } catch (error){
        console.error("Error creating orthodontics.", error);
    }
}

async function setOrthoInactive(patientID, service){
    try{
        let orth = await orthoModel.findOne({patientID : patientID, service: service});

        orth.isActive = false;

        await orth.save();

        console.log("Successfully inactivated orthodontics.");
    } catch (error) {
        console.error("Error setting orthodontics inactive.", error);
    }
}

async function readPatient(patientID) {
    let patient = await patientModel.findOne({id: patientID});

    return patient;
}

async function getMonthlyStats(year, month){
    try{
        let totalEarned = 0;
        let numOfAppointments = 0;

        const treatmentsThisMonth = await treatmentModel.find({
            $expr: {
                $and: [
                    {$eq: [{ $month: "$date"}, month]},
                    {$eq: [{ $year: "$date"}, year]}
                ]   
            }
        });

        if(treatmentsThisMonth.length != 0){
            treatmentsThisMonth.forEach(function(treatment){
                totalEarned += treatment.amountPaid;
                numOfAppointments++;
            })
        }

        return [totalEarned, numOfAppointments, treatmentsThisMonth];
    }catch(error){
        console.error('Error getting monthly stats. ', error);
    }
}

async function createPatient(firstName, lastName, middleName, nickname, 
    homeAddress, birthdate, age, sex, religion, nationality, email, homeNo, 
    occupation, dentalInsurance, officeNo, faxNo, contact, effectiveDate, 
    guardianName, guardianOccupation, referralName, consultationReason, lastDentist, lastDentalVisit, pic) {
    var patientID = 1;
    let lastPatient = await patientModel.findOne().sort({ id: -1 });
    // console.log(await patientModel.countDocuments());

    if(lastPatient){
        patientID = lastPatient.id + 1;
    }

    

    // Create the new patient document
    const patient = new patientModel({
        id: patientID,
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,
        nickname: nickname,
        homeAddress: homeAddress,
        birthdate: birthdate,
        age: age,
        sex: sex,
        religion: religion,
        nationality: nationality,
        email: email,
        homeNo: homeNo,
        occupation: occupation,
        dentalInsurance: dentalInsurance,
        officeNo: officeNo,
        faxNo: faxNo,
        contact: contact,
        effectiveDate: effectiveDate,
        guardianName: guardianName,
        guardianOccupation: guardianOccupation,
        referralName: referralName,
        consultationReason: consultationReason,
        lastDentist: lastDentist,
        lastDentalVisit: lastDentalVisit,
        pic: pic,
    });

    // Save the patient
    await patient.save().then(function () {
        console.log("Patient created.");
    });

    return patientID;
}

async function searchPatientName(patientName){
    const patient = await patientModel.find({
        $or:[
            { firstName: { $regex: patientName, $options: 'i' } },  
            { lastName: { $regex: patientName, $options: 'i' } }, 
            { middleName: { $regex: patientName, $options: 'i' } }, 
            { nickname: { $regex: patientName, $options: 'i' } } 
        ]
    })

    return patient;
}

async function updatePatientInfo(patientID, nickname, 
    homeAddress, birthdate, age, sex, religion, nationality, email, homeNo, 
    occupation, dentalInsurance, officeNo, faxNo, contact, 
    guardianName, guardianOccupation, referralName, consultationReason, lastDentist, lastDentalVisit){

        
        patientModel.findOne({id: patientID}).then(function(patient){

            // patient.firstName = firstName;
            // patient.lastName = lastName;
            // patient.middleName = middleName;
            patient.nickname = nickname;
            patient.homeAddress = homeAddress;
            patient.birthdate = birthdate;
            patient.age = age;
            patient.sex = sex;
            patient.religion = religion;
            patient.nationality = nationality;
            patient.email = email;
            patient.homeNo = homeNo;
            patient.occupation = occupation;
            patient.dentalInsurance = dentalInsurance;
            patient.officeNo = officeNo;
            patient.faxNo = faxNo;
            patient.contact = contact;
            patient.effectiveDate = effectiveDate;
            patient.guardianName = guardianName;
            patient.guardianOccupaton = guardianOccupation;
            patient.referralName = referralName;
            patient.consultationReason = consultationReason;
            patient.lastDentist = lastDentist;
            patient.lastDentalVisit = lastDentalVisit;
            //patient.pic = pic

            patient.save().then(function(){
                console.log("patient updated");
            });
        });
    }

async function deactivatePatient(patientID){
    patientModel.findOne({id: patientID}).then(function(patient){
        patient.isActive = false;

        patient.save().then(function(updated){
            console.log(updated.firstName + " patient deactivated");
        });
    })
}

async function createMedicalHistory(patientID, physicianName, physicianOfficeAddress, physicianSpecialty
                                    , physicianOfficeNumber, prescription, illnessOrSurgery, condition
                                    , isUsingTobacco, isAlcoholOrDrugs, allergies, isPregnant, isNursing
                                    , isBirthControlPills, healthProblems){
        const medicalHistory = new medicalHistoryModel(
            {
                patientID: patientID,
                physicianName: physicianName,
                physicianOfficeAddress: physicianOfficeAddress,
                physicianSpecialty: physicianSpecialty,
                physicianOfficeNumber: physicianOfficeNumber,
                prescription: prescription,
                illnessOrSurgery: illnessOrSurgery,
                condition: condition,
                isUsingTobacco: isUsingTobacco,
                isAlcoholOrDrugs: isAlcoholOrDrugs,
                allergies: allergies,
                isPregnant: isPregnant,
                isNursing: isNursing,
                isBirthControlPills: isBirthControlPills,
                healthProblems: healthProblems,
            }
        );

        await medicalHistory.save();
        console.log('medical history created');
    }

async function updateMedicalHistory(patientID, physicianName, physicianOfficeAddress, physicianSpecialty
                                    , physicianOfficeNumber, prescription, illnessOrSurgery, condition
                                    , isUsingTobacco, isAlcoholOrDrugs, allergies, isPregnant, isNursing
                                    , isBirthControlPills, healthProblems){
    const medicalHistory = await medicalHistoryModel.findOne({patientID: patientID});

    if(medicalHistory){
        console.log("updating med history found.");
        medicalHistory.physicianName = physicianName;
        medicalHistory.physicianOfficeAddress = physicianOfficeAddress;
        medicalHistory.physicianSpecialty = physicianSpecialty;
        medicalHistory.physicianOfficeNumber = physicianOfficeNumber;
        medicalHistory.prescription = prescription;
        medicalHistory.illnessOrSurgery = illnessOrSurgery;
        medicalHistory.condition = condition;
        medicalHistory.isUsingTobacco = isUsingTobacco;
        medicalHistory.isAlcoholOrDrugs = isAlcoholOrDrugs;
        medicalHistory.allergies = allergies;
        medicalHistory.isPregnant = isPregnant;
        medicalHistory.isNursing = isNursing;
        medicalHistory.isBirthControlPills = isBirthControlPills;
        medicalHistory.healthProblems = healthProblems;

        await medicalHistory.save();
    } else {
        console.log("updating mes history not found.");
        await createMedicalHistory(patientID, physicianName, physicianOfficeAddress, physicianSpecialty
            , physicianOfficeNumber, prescription, illnessOrSurgery, condition
            , isUsingTobacco, isAlcoholOrDrugs, allergies, isPregnant, isNursing
            , isBirthControlPills, healthProblems);
    }
}

async function readMedicalHistory(patientID){
    const medicalHistory = await medicalHistoryModel.findOne({patientID: patientID});

    return medicalHistory;
}

async function createTreatment(patientID, date, teethAffected, procedure, dentist, amountCharged
                                , amountPaid, balance, nextAppointmentDate, status
){
    const lastTreatment = await treatmentModel.findOne().sort({id: -1});
    var treatmentID = 1;

    if(lastTreatment){
        treatmentID = lastTreatment.id + 1;
    }

    const treatment = new treatmentModel({
        id: treatmentID,
        date: date,
        teethAffected: teethAffected,
        procedure: procedure,
        dentist: dentist,
        amountCharged: amountCharged,
        amountPaid: amountPaid,
        balance: balance,
        nextAppointmentDate: nextAppointmentDate,
        status: status,
        patientID: patientID
    })

    await treatment.save();

    //creates orthodontics document if treatment is orthodontics
    let serviceOrtho = await serviceModel.findOne({service: treatment.procedure, type:'Ortho'});

    if(serviceOrtho){
        await createOrtho(patientID, treatment.procedure);
    }

    const patient = await patientModel.findOne({id: patientID});
    await patient.treatments.push(treatment._id);

    await patient.save();
}

async function updateTreatment(treatmentID, date, teethAffected, procedure, dentist, amountCharged
                                , amountPaid, balance, nextAppointmentDate, status){

    const treatment = await treatmentModel.findOne({ id: treatmentID });    

     treatment.date = date;
    treatment.teethAffected = teethAffected;
        treatment.procedure = procedure;
        treatment.dentist = dentist;
        treatment.amountCharged = amountCharged;
        treatment.amountPaid = amountPaid;
        treatment.balance = balance;
        treatment.nextAppointmentDate = nextAppointmentDate;
        treatment.status = status;

    await treatment.save();

    

 }

 async function readTreatment(treatmentID){
    const treatment = treatmentModel.findOne({id: treatmentID});
    return treatment;
 }

async function uniqueServices() {
    try {
        const services = await serviceModel.distinct('service');
        return services;
    } catch (error) {
        console.error("Error fetching unique services:", error);
        return [];
    }
}

async function getPatientsByProcedure(procedure) {
    try {
        const query = procedure ? { procedure } : {};
        return await patientModel.find(query).exec();
    } catch (error) {
        console.error('Error fetching patients by procedure:', error);
        throw error;
    }
}

async function createService(serviceName, price, type) {
    try {
        const newService = new serviceModel({
            service: serviceName,
            price: price,
            type: type,
        });
        await newService.save();
        console.log('Service created successfully:', newService);
        return newService;
    } catch (error) {
        console.error('Error creating service:', error);
        throw error;
    }
}

async function readService(serviceId) {
    try {
        const service = await serviceModel.findById(serviceId);
        if (!service) {
            throw new Error('Service not found');
        }
        console.log('Service retrieved:', service);
        return service;
    } catch (error) {
        console.error('Error reading service:', error);
        throw error;
    }
}

async function updateService(serviceId, updates) {
    try {
        const updatedService = await serviceModel.findByIdAndUpdate(
            serviceId,
            updates,
            { new: true, runValidators: true }
        );
        if (!updatedService) {
            throw new Error('Service not found');
        }
        console.log('Service updated successfully:', updatedService);
        return updatedService;
    } catch (error) {
        console.error('Error updating service:', error);
        throw error;
    }
}


module.exports = {
    readPatient,
    createPatient,
    searchPatientName,
    updatePatientInfo,
    deactivatePatient,
    updateMedicalHistory,
    createMedicalHistory,
    readMedicalHistory,
    createTreatment,
    updateTreatment,
    readTreatment,
    convertToDate,
    uniqueServices,
    getPatientsByProcedure,
    getMonthlyStats,
    createOrtho,
    setOrthoInactive,
    createService,
    readService,
    updateService
};

