//Animation for "reactivate and deactivate" button

// Get the elements
const deactivateButton = document.getElementById('deactivate-patient-button');
const toggleCheckbox = document.getElementById('deactivate-patient-toggle');
const nameGroup = document.getElementById('name-group');

// Function to toggle the button and name group state
function toggleButtonState() {
    if (toggleCheckbox.checked) {
        // Update button to "Reactivate"
        deactivateButton.textContent = "Reactivate";
        deactivateButton.style.backgroundColor = "rgb(2, 158, 9)";
        
        // Add gray-out effect to the name group
        nameGroup.classList.add('grayed-out');
    } else {
        // Update button to "Deactivate"
        deactivateButton.textContent = "Deactivate";
        deactivateButton.style.backgroundColor = "#db2424";
        
        // Remove gray-out effect from the name group
        nameGroup.classList.remove('grayed-out');
    }
}

// Listen for changes in the checkbox (toggle state)
toggleCheckbox.addEventListener('change', toggleButtonState);

// Initialize the button and name group state when the page loads
toggleButtonState();


//==================================================================
