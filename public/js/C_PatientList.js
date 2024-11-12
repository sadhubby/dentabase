document.addEventListener('DOMContentLoaded', () => {
    loadProcedures();
    document.getElementById('procedureFilterButton').addEventListener('click', filterPatientsByProcedure);
});

async function loadProcedures() {
    try {
        const response = await fetch('/api/unique-procedures');
        const procedures = await response.json();
        const dropdown = document.getElementById('procedureDropdown');

        dropdown.innerHTML = '<option value="">Select Procedure</option>';
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
    try {
        const procedure = document.getElementById('procedureDropdown').value;
        if (!procedure) {
            alert('Please select a procedure to filter.');
            return;
        }

        const url = `/api/patients?procedure=${encodeURIComponent(procedure)}`;
        const response = await fetch(url);
        const patients = await response.json();

        displayPatients(patients);
    } catch (error) {
        console.error('Error filtering patients:', error);
    }
}

function displayPatients(patients) {
    const patientsTable = document.getElementById('patientsTable');
    patientsTable.querySelector('tbody').innerHTML = ''; 

    patients.forEach(patient => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.name}</td>
            <td>${patient.procedure}</td>
            <td>${patient.status}</td>
            <td>${new Date(patient.date).toLocaleDateString()}</td>
        `;
        patientsTable.querySelector('tbody').appendChild(row);
    });
}
