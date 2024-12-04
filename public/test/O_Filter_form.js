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

        dropdown.innerHTML = '<option value="All">All</option>'; // Default option to show all patients
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
    console.log("Applying filters for treatment type:", treatmentType);

    try {
        if (treatmentType === "All") {
            console.log("Fetching all patients as 'All' option selected.");
            await filterPatientsByService("All"); // Fetch all patients
        } else {
            await filterPatientsByService(treatmentType); // Fetch filtered patients
        }
        cancelFilter(); // Hide the filter form
    } catch (error) {
        console.error("Error applying filters:", error);
        alert("Failed to apply filters. Please try again.");
    }
}
