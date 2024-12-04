document.addEventListener("DOMContentLoaded", () => {
    // Get references to the elements
    const addServiceButton = document.querySelector('#add-service'); // "Add Service" button
    const serviceFormContainer = document.querySelector('.services-form-file'); // Form container
    const cancelButton = document.querySelector('.cancel-button'); // Cancel button

    // Show the form when the "Add Service" button is clicked
    addServiceButton.addEventListener('click', () => {
        serviceFormContainer.style.display = 'block'; // Show the form
    });

    // Hide the form when the "Cancel" button is clicked
    cancelButton.addEventListener('click', () => {
        serviceFormContainer.style.display = 'none'; // Hide the form
    });
});
