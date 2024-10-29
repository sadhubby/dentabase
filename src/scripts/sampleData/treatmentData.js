const sampleTreatments = [
    {
        id: 1,
        date: new Date(),
        teethAffected: [6, 7],
        procedure: 'root canal',
        dentist: 'Dr. John Doe',
        amountCharged: 1000,
        amountPaid: 1000,
        balance: 0,
        nextAppointmentDate: new Date('2025-01-01'),
        status: 'ongoing'
    }
];

module.exports = sampleTreatments;