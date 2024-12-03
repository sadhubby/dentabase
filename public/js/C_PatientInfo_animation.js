// Get the button and the checkbox
const deactivateButton = document.getElementById('deactivate-patient-button');
const toggleCheckbox = document.getElementById('deactivate-patient-toggle');

// Function to toggle the button state
function toggleButtonState() {
    if (toggleCheckbox.checked) {
        // Change to Reactivate
        deactivateButton.textContent = "Reactivate";
        deactivateButton.style.backgroundColor = "gray"; // Change background to gray
    } else {
        // Change to Deactivate
        deactivateButton.textContent = "Deactivate";
        deactivateButton.style.backgroundColor = "#db2424"; // Reset to the original red color
    }
}

// Listen for changes in the checkbox (toggle state)
toggleCheckbox.addEventListener('change', toggleButtonState);

// Initialize the button state when the page loads (in case it's already checked)
toggleButtonState();
