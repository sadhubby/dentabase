// patientID:{
//     type: Number,
//     required: true,
//     unique: true
// },
// patientName:{
//     type: String,
//     required: true
// },
// patientContact:{
//     type: Number,
//     require: true
// },
// patientEmail:{
//     type: String,
//     required: true
// },
// patientTreatments:[treatment.schema]
// });

const samplePatient = [
    {
        patientID: 1,
        patientPic: "https://static.wikia.nocookie.net/bwwe/images/5/5b/Cody_Rhodes_5.png/revision/latest?cb=20220523040407",
        patientName: "Cody Rhodes",
        patientContact: "1234567890",
        patientEmail: "test_email@domain.com",
        patientTreatments: [treatments[0]]
    }
];

module.exports = samplePatients;