const treatments = require('./treatmentData');
const samplePatients = [
    // {
    //     patientID: 1,
    //     patientPic: "https://static.wikia.nocookie.net/bwwe/images/5/5b/Cody_Rhodes_5.png/revision/latest?cb=20220523040407",
    //     patientName: "Cody Rhodes",
    //     patientContact: "1234567890",
    //     patientEmail: "test_email@domain.com",
    //     patientTreatments: [treatments[0]]
    // },
    {
        id: 1,
        firstName: "Cody",
        lastName: "Rhodes",
        middleName: "Mid",
        nickname: "Cod",
        homeAddress: "Taft Avenue Manila",
        birthdate: new Date('1990-01-01'),
        age: 25,
        sex: 'M',
        religion: "Catholic",
        nationality: "American",
        email: "test_email@domain.com",
        homeNo: 5,
        occupation: "Wrestler",
        dentalInsurance: "Teeth Company",
        officeNo: 7,
        faxNo: 98765,
        contact: 9173272156,
        effectiveDate: new Date('2024-10-01'),
        guardianName: "Bob the Builder",
        guardianOccupation: "Builder",
        referralName: "Dr. John",
        consultationReason: "Teeth Fixing",
        pic: "picture",
        treatments: [treatments[0]]
    }
];

module.exports = samplePatients;