async function filterPatients() {
    const selectedProcedure = document.getElementById('procedure-filter').value;
    const response = await fetch('/patients'); 
    const patients = await response.json();

    const filteredPatients = selectedProcedure 
        ? patients.filter(patient => patient.latestProcedure === selectedProcedure) 
        : patients;

    displayPatients(filteredPatients); 
}

function displayPatients(patients) {
    const patientTable = document.getElementById('patient-table-body'); 
    patientTable.innerHTML = ''; 

    patients.forEach(patient => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.firstName}</td>
            <td>${patient.lastName}</td>
            <td>${patient.latestProcedure}</td>
            <!-- Add other patient details as needed -->
        `;
        patientTable.appendChild(row);
    });
}

function createPatient(){
    
}
