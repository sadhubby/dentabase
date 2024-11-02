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

    // Initialize the date
    let currentDate = new Date();

    // Function to update the displayed date
    function updateDateDisplay() {
        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        dateDisplay.textContent = currentDate.toLocaleDateString('en-US', options);
    }
    
    // Event listener for previous date button
    prevDateBtn.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() - 1);
        updateDateDisplay();
    });
    
    // Event listener for next date button
    nextDateBtn.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() + 1);
        updateDateDisplay();
    });
    
    // Initial date display update
    updateDateDisplay();
    });
