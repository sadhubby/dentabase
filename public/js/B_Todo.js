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


// JavaScript code to manage date navigation
document.addEventListener('DOMContentLoaded', () => {
    const dateDisplay = document.getElementById('date-display');
    const prevDateBtn = document.getElementById('prev-date-btn');
    const nextDateBtn = document.getElementById('next-date-btn');

    let currentDate = new Date(dateDisplay.dataset.date || new Date()); // Initialize date from data attribute or default to today

    function updateDateDisplay() {
        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        dateDisplay.textContent = currentDate.toLocaleDateString('en-US', options);
    }

    async function fetchAppointments(date) {
        const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        console.log("Fetching appointments for date:", formattedDate); // Debugging output
    
        try {
            const response = await fetch(`/to-do?date=${formattedDate}`, {cache: no-cache});
            const html = await response.text();
            document.getElementById('appointments-container').innerHTML = html; // Update container with new data
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    }
    

    prevDateBtn.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() - 1);
        updateDateDisplay();
        fetchAppointments(currentDate);
    });

    nextDateBtn.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() + 1);
        updateDateDisplay();
        fetchAppointments(currentDate);
    });

    // Initialize display on page load
    updateDateDisplay();
    fetchAppointments(currentDate);
});
