$(document).ready(function(){
    $('.cancel-frame').click(function() {
        console.log("Cancel clicked");
        $('#form-container').hide();
        $('.overlay').hide();
    });

    $('.create-appointment-elements').click(function() {
        console.log("Create Appointment clicked");
        $('#form-container').show();
        $('.overlay').show();
    });

    $('.done-frame').click(function() {
        console.log("Create Appointment clicked");
        $('#form-container').hide();
        $('.overlay').hide();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const dateDisplay = document.getElementById('date-display');
    const prevDateBtn = document.getElementById('prev-date-btn');
    const nextDateBtn = document.getElementById('next-date-btn');

    let currentPage = 0; //offset of pages. 0 = today

    async function fetchAppointments(page) {
        try {
            const response = await fetch(`/to-do?page=${page}`, { cache: 'no-cache' });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const html = await response.text();
    
            //parse the returned HTML to update the DOM
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
    
            //update the appointments container
            const newAppointmentsContainer = doc.querySelector("tbody");
            if (newAppointmentsContainer) {
                const currentAppointmentsContainer = document.querySelector("tbody");
                currentAppointmentsContainer.innerHTML = newAppointmentsContainer.innerHTML;
            }
    
            //update date display
            const newDateDisplay = doc.getElementById("date-display");
            if (newDateDisplay) {
                const dateDisplay = document.getElementById("date-display");
                dateDisplay.textContent = newDateDisplay.textContent;
                dateDisplay.dataset.page = page;
            }
    
            const newAppointmentCount = doc.querySelector(".appointment-number");
            if (newAppointmentCount) {
                document.querySelector(".appointment-number").textContent = newAppointmentCount.textContent;
            }
            console.log("Appointments updated for page:", page);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    }
    

    
    

    //prev-Date btn click
    prevDateBtn.addEventListener('click', () => {
        currentPage--; // Move to the previous page (day)
        console.log("Previous button clicked, current page:", currentPage);
        fetchAppointments(currentPage); // Fetch appointments for the new page
    });

    //next-Date btn click
    nextDateBtn.addEventListener('click', () => {
        currentPage++; // Move to the next page (day)
        console.log("Next button clicked, current page:", currentPage);
        fetchAppointments(currentPage); // Fetch appointments for the new page
    });

    //load appointments on current
    fetchAppointments(currentPage);
});

document.addEventListener("DOMContentLoaded", () => {
    const deleteButton = document.querySelector(".trash-elements[data-action='delete-selected']");
    
    deleteButton.addEventListener("click", async () => {
        // Get all checkboxes and filter for checked ones
        const selectedCheckboxes = Array.from(document.querySelectorAll("input[type='checkbox']:checked"));
        
        // Extract patient IDs from checkboxes
        const selectedIds = selectedCheckboxes.map(checkbox => checkbox.value);
        
        if (selectedIds.length === 0) {
            alert("Please select at least one patient to delete.");
            return;
        }

        // Confirm deletion
        const confirmDelete = confirm("Are you sure you want to delete the selected patients?");
        if (!confirmDelete) return;

        // Send request to the server to remove the effectiveDate for each patient
        try {
            const response = await fetch("/remove-effective-dates", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ patientIds: selectedIds }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Remove the rows from the table
                selectedIds.forEach(id => {
                    const row = document.getElementById(`row-${id}`);
                    if (row) row.remove();
                });

                alert("Selected patients removed from the To-Do list.");
            } else {
                alert("Failed to delete patients. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting patients:", error);
            alert("An error occurred while deleting patients.");
        }
    });
});