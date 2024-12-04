document.addEventListener('DOMContentLoaded', () => {
    const filterButton = document.getElementById("procedure-filter");

    if (filterButton) {
        filterButton.addEventListener("click", toggleFilterForm);
    } else {
        console.error("Filter button not found!");
    }

    loadPatients(); // Initial load of all patients
});

// Function to toggle the filter form
function toggleFilterForm() {
    const filterForm = document.getElementById("filterForm");
    if (!filterForm) {
        console.error("Filter form element not found!");
        return;
    }

    filterForm.style.display = "block";
    console.log("Filter form opened.");
}

// Function to load the patient list dynamically
async function loadPatients() {
    try {
        const response = await fetch('/api/patients');
        const patients = await response.json();
        console.log("All patients received from API:", patients);

        displayPatients(patients);
    } catch (error) {
        console.error("Error loading all patients:", error);
    }
}

// Function to filter patients by service
async function filterPatientsByService(service) {
    try {
        console.log("Fetching patients for service:", service);
        const response = await fetch(`/api/patients-by-service?service=${encodeURIComponent(service)}`);

        if (!response.ok) throw new Error(`Failed to fetch patients: ${response.statusText}`);

        const result = await response.json();
        console.log("Filtered patients response:", result);

        updatePatientList(result.patients); // Dynamically update the table
    } catch (error) {
        console.error("Error filtering patients:", error);
    }
}

// Function to dynamically update the patient list in the table
function updatePatientList(patients) {
    const tbody = document.getElementById('patient-table');

    if (!tbody) {
        console.error("Patient table body element not found!");
        return;
    }

    tbody.innerHTML = ""; // Clear previous rows

    if (patients.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="6">No patients found for this service</td>`;
        tbody.appendChild(row);
        return;
    }

    patients.forEach(patient => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.name}</td>
            <td>${patient.phone}</td>
            <td>${patient.email}</td>
            <td>${patient.address}</td>
            <td>${new Date(patient.lastVisit).toLocaleDateString()}</td>
            <td>${patient.lastProcedure}</td>
        `;
        tbody.appendChild(row);
    });

    console.log("Patient list updated with:", patients);
}
