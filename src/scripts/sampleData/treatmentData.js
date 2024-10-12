// treatmentName: {
//     type: String,
//     required: true
// },
// treatmentData:{
//     type: Date,
//     required: true
// },
// status:{
//     type: String, 
//     enum:['ongoing', 'completed'], default: 'ongoing'
// }

const sampleTreatments = [
    {
        treatmentName: "Root Canal",
        treatmentDate: new Date('2024-10-12'),
        status: 'ongoing'
    }
];

module.exports = sampleTreatments;