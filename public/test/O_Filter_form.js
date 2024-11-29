document.addEventListener('DOMContentLoaded', () => {
    loadServices();
});

// Function to cancel and hide the filter form
function cancelFilter() {
    const filterForm = document.getElementById("filterForm"); 
    if (!filterForm) {
        console.error("Filter form element not found!");
        return;
    }

    filterForm.style.display = "none";
    console.log("Filter form hidden."); 
}

// Function to load unique services
async function loadServices() {
    try {
        const response = await fetch('/api/unique-services'); 
        const services = await response.json();
        const dropdown = document.getElementById('treatmentType');

        dropdown.innerHTML = '<option value="">Select Service</option>';
        services.forEach(service => {
            const option = document.createElement('option');
            option.value = service;
            option.textContent = service;
            dropdown.appendChild(option);
        });

        console.log("Services loaded into the dropdown.");
    } catch (error) {
        console.error("Error loading services:", error);
    }
}

// Function to apply the selected filters and trigger dynamic filtering
function applyFilters() {
    const treatmentType = document.getElementById("treatmentType").value;
    console.log("Selected Treatment Type:", treatmentType);
    
    if (!treatmentType) {
        alert("Please select a service type.");
        return;
    }

    filterPatientsByProcedure();
}

// Function to filter patients based on the selected service
async function filterPatientsByProcedure() {
    try {
        const service = document.getElementById('treatmentType').value; 
        console.log("Service selected in filter:", service);

        if (!service) {
            alert("Please select a service type.");
            return;
        }

        const response = await fetch(`/api/patients-by-service?service=${encodeURIComponent(service)}`);
        console.log("API Request Sent to:", `/api/patients-by-service?service=${encodeURIComponent(service)}`);

        if (!response.ok) {
            throw new Error(`Failed to filter patients: ${response.statusText}`);
        }

        const patients = await response.json();
        console.log("Patients received from API:", patients);

        displayPatients(patients);
    } catch (error) {
        console.error("Error filtering patients:", error);
    }
}

// Function to display filtered patients in the table
function displayPatients(patients) {
    console.log("Displaying Patients:", patients);

    const patientsTable = document.getElementById('patientsTable');
    const tbody = patientsTable.querySelector('tbody');
    tbody.innerHTML = ""; 

    if (patients.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="6">No patients found for this service</td>`;
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