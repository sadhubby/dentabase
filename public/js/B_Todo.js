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

    let currentPage = 0; // Tracks the current page offset (0 = today, -1 = yesterday, etc.)

    async function fetchAppointments(page) {
        try {
            const response = await fetch(`/to-do?page=${page}`, { cache: 'no-cache' });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const html = await response.text();
    
            // Parse the returned HTML to update the DOM
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
    
            // Update the appointments container
            const newAppointmentsContainer = doc.querySelector("tbody");
            if (newAppointmentsContainer) {
                const currentAppointmentsContainer = document.querySelector("tbody");
                currentAppointmentsContainer.innerHTML = newAppointmentsContainer.innerHTML;
            }
    
            // Update the date display
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
    

    
    

    // Previous Date Button Click
    prevDateBtn.addEventListener('click', () => {
        currentPage--; // Move to the previous page (day)
        console.log("Previous button clicked, current page:", currentPage);
        fetchAppointments(currentPage); // Fetch appointments for the new page
    });

    // Next Date Button Click
    nextDateBtn.addEventListener('click', () => {
        currentPage++; // Move to the next page (day)
        console.log("Next button clicked, current page:", currentPage);
        fetchAppointments(currentPage); // Fetch appointments for the new page
    });

    // Fetch today's appointments on page load
    fetchAppointments(currentPage);
});