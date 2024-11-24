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


// document.addEventListener('DOMContentLoaded', () => {
//     const dateDisplay = document.getElementById('date-display');
//     const prevDateBtn = document.getElementById('prev-date-btn');
//     const nextDateBtn = document.getElementById('next-date-btn');

//     let currentDate = new Date(dateDisplay.dataset.date || new Date()); 

//     function updateDateDisplay() {
//         const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
//         dateDisplay.textContent = currentDate.toLocaleDateString('en-US', options);
//     }

//     async function fetchAppointments(date) {
//         const formattedDate = date.toISOString().split('T')[0]; // Ensure it's in 'YYYY-MM-DD' format
//         console.log("Fetching appointments for date:", formattedDate);
    
//         try {
//             const response = await fetch(`/to-do?date=${formattedDate}`, { cache: 'no-cache' });
//             const html = await response.text();
//             document.getElementById('appointments-container').innerHTML = html; 
//         } catch (error) {
//             console.error("Error fetching appointments:", error);
//         }
//     }
    
    

//     prevDateBtn.addEventListener('click', () => {
//         currentDate.setDate(currentDate.getDate() - 1);
//         updateDateDisplay();
//         fetchAppointments(currentDate);
//     });

//     nextDateBtn.addEventListener('click', () => {
//         currentDate.setDate(currentDate.getDate() + 1);
//         updateDateDisplay();
//         fetchAppointments(currentDate);
//     });

//     // Initialize display on page load
//     updateDateDisplay();
//     fetchAppointments(currentDate);
// });
document.addEventListener('DOMContentLoaded', () => {
    const dateDisplay = document.getElementById('date-display');
    const prevDateBtn = document.getElementById('prev-date-btn');
    const nextDateBtn = document.getElementById('next-date-btn');

    let currentPage = 0; // Tracks the current page offset (0 = today, -1 = yesterday, etc.)

    // Fetch appointments for the specified page (date offset)
    async function fetchAppointments(page) {
        try {
            const response = await fetch(`/to-do?page=${page}`, { cache: 'no-cache' });
            const html = await response.text();
    
            // Parse the new HTML response to extract the updated dateDisplay
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
    
            // Update the appointments container
            const newAppointmentsContainer = doc.getElementById('appointments-container');
            if (newAppointmentsContainer) {
                document.getElementById('appointments-container').innerHTML = newAppointmentsContainer.innerHTML;
            }
    
            // Update the dateDisplay
            const newDateDisplay = doc.getElementById('date-display');
            if (newDateDisplay) {
                const dateDisplay = document.getElementById('date-display');
                dateDisplay.textContent = newDateDisplay.textContent; // Update the text content
                dateDisplay.dataset.page = page; // Update the page data attribute
            }
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