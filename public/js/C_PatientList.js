document.addEventListener('DOMContentLoaded', () => {
    const filterButton = document.getElementById("procedure-filter");

    if (filterButton) {
        filterButton.addEventListener("click", toggleFilterForm);
    } else {
        console.error("Filter button not found!");
    }

    loadPatients();
});

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
        console.log("Patients received from API:", patients);

        displayPatients(patients);
    } catch (error) {
        console.error("Error loading patients:", error);
    }
}

// Function to display patients in the table
function displayPatients(patients) {
    console.log("Displaying Patients:", patients);

    const patientsTable = document.getElementById('patientsTable');
    const tbody = patientsTable.querySelector('tbody');
    tbody.innerHTML = "";

    if (patients.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="6">No patients found</td>`;
        tbody.appendChild(row);
        return;
    }

    patients.forEach(patient => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.name || "N/A"}</td>
            <td>${patient.phone || "N/A"}</td>
            <td>${patient.email || "N/A"}</td>
            <td>${patient.address || "N/A"}</td>
            <td>${patient.lastVisit || "N/A"}</td>
            <td>${patient.lastProcedure || "N/A"}</td>
        `;
        tbody.appendChild(row);
    });

    console.log("Patient list updated.");
}
