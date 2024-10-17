const patientModel = require('../models/patient.js');

async function readPatient(patientID) {
    let patient = await patientModel.findOne({id: patientID});

    return patient;
}

async function createPatient(firstName, lastName, middleName, nickname, 
    homeAddress, birthdate, age, sex, religion, nationality, email, homeNo, 
    occupation, dentalInsurance, officeNo, faxNo, contact, effectiveDate, 
    guardianName, guardianOccupation, referralName, consultationReason, pic) {
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
        pic: pic,
    });

    // Save the patient
    await patient.save().then(function () {
        console.log("Patient created.");
    });
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

async function updatePatientInfo(patientID, firstName, lastName, middleName, nickname, 
    homeAddress, birthdate, age, sex, religion, nationality, email, homeNo, 
    occupation, dentalInsurance, officeNo, faxNo, contact, effectiveDate, 
    guardianName, guardianOccupation, referralName, consultationReason, pic){
        
        patientModel.findOne({id: patientID}).then(function(patient){

            patient.firstName = firstName;
            patient.lastName = lastName;
            patient.middleName = middleName;
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
            patient.pic = pic

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


module.exports = {
    readPatient,
    createPatient,
    searchPatientName,
    updatePatientInfo,
    deactivatePatient
};