$(document).ready(function () {
    // Initially hide the form and overlay
    $('.todo-form-file').hide(); // Ensure the form is hidden on page load
    $('.overlay').hide(); // Ensure the overlay is hidden on page load

    /* CANCEL BUTTON */
    $('.cancel-button').click(function() {
        console.log("Cancel clicked");
        $('.todo-form-file').hide(); // Hide the form
        $('.overlay').hide(); // Hide the overlay
    });

    $('.create-appointment-elements').click(function() {
        console.log("Create Appointment clicked");
        $('.todo-form-file').show(); // Show the form
        $('.overlay').show(); // Show the overlay
    });

    $('.done-button').click(function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        // Get form data
        const treatment = $('#treatment').val();
        const patientName = $('#patient-name').val();
        const email = $('#email').val();
        const phoneNumber = $('#phone-number').val();
        const date = $('#date').val();
        const startTime = $('#start-time').val();
        const endTime = $('#end-time').val();

        // Log the form data (you can replace this with your saving logic)
        console.log("Form data to save:", { treatment, patientName, email, phoneNumber, date, startTime, endTime });

        // Hide the form and overlay after saving
        $('.todo-form-file').hide(); // Hide the form
        $('.overlay').hide(); // Hide the overlay
    });
});
