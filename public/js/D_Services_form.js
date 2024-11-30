// Get references to the elements
const addServiceButton = document.querySelector('.create-treatment-elements'); // "Add Service" button
const serviceFormContainer = document.querySelector('.services-form-file .container'); // Form container
const cancelButton = document.querySelector('.cancel-button'); // Cancel button

// Show the form when the "Add Service" button is clicked
addServiceButton.addEventListener('click', () => {
    serviceFormContainer.classList.add('show'); // Add the 'show' class to display the form
});

// Hide the form when the "Cancel" button is clicked
cancelButton.addEventListener('click', () => {
    serviceFormContainer.classList.remove('show'); // Remove the 'show' class to hide the form
});
