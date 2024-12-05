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

// Function to load unique services into the dropdown
async function loadServices() {
    try {
        const response = await fetch('/api/unique-services');
        const services = await response.json();
        const dropdown = document.getElementById('treatmentType');

        dropdown.innerHTML = '<option value="All">All</option>';
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
async function applyFilters() {
    const treatmentType = document.getElementById("treatmentType").value;
    const sortOrder = document.getElementById("patientNameSort").value;
    const lastVisitSort = document.getElementById("lastVisitSort").value;

    const query = new URLSearchParams();
    if (treatmentType) query.append('service', treatmentType);
    if (sortOrder) query.append('sortOrder', sortOrder);
    if (lastVisitSort) query.append('lastVisitSort', lastVisitSort);

    try {
        const response = await fetch(`/api/patients-by-service?${query.toString()}`);
        const result = await response.json();
        updatePatientList(result.patients);
        cancelFilter();
    } catch (error) {
        console.error("Error applying filters:", error);
    }
}

