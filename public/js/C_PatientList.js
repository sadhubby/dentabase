document.addEventListener('DOMContentLoaded', () => {
    loadProcedures();
    document.getElementById('procedureDropdown').addEventListener('change', filterPatientsByProcedure);
});

async function loadProcedures() {
    try {
        const response = await fetch('/api/unique-procedures');
        const procedures = await response.json();
        const dropdown = document.getElementById('procedureDropdown');

        procedures.forEach(procedure => {
            const option = document.createElement('option');
            option.value = procedure;
            option.textContent = procedure;
            dropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading procedures:', error);
    }
}

async function filterPatientsByProcedure() {
    const selectedProcedure = document.getElementById('procedureDropdown').value;
    try {
        const response = await fetch('/patients');
        const patients = await response.json();

        const filteredPatients = selectedProcedure === 'all'
            ? patients
            : patients.filter(patient => patient.lastTreatment === selectedProcedure);

        displayPatients(filteredPatients);
    } catch (error) {
        console.error('Error filtering patients:', error);
    }
}

function displayPatients(patients) {
    const patientTable = document.getElementById('patient-table-body');
    patientTable.innerHTML = ''; 

    patients.forEach(patient => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.name}</td>
            <td>${patient.phone}</td>
            <td>${patient.email}</td>
            <td>${patient.address}</td>
            <td>${patient.lastTreatment}</td>
        `;
        patientTable.appendChild(row);
    });
}