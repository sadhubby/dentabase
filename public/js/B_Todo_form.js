// document.querySelector('.done-button').addEventListener('click', async (e) => {
//     e.preventDefault(); // Prevent the default form submission

//     // Get form data
//     const patientID = document.getElementById('patient-name').dataset.patientId; // Ensure you pass this as a data attribute
//     const effectiveDate = document.getElementById('date').value;
//     const startTime = document.getElementById('start-time').value;
//     const endTime = document.getElementById('end-time').value;

//     // Validate form inputs
//     if (!effectiveDate || !startTime || !endTime) {
//         alert('Please fill in all fields!');
//         return;
//     }

//     try {
//         // Send the data to the backend
//         const response = await fetch('/update-effective-date', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ patientID, effectiveDate, startTime, endTime }),
//         });

//         const result = await response.json();
//         if (response.ok) {
//             console.log(result.message);

//             // Refresh the appointments dynamically
//             fetchAppointments(currentPage); // Assuming fetchAppointments() is defined in your To-Do JS
//         } else {
//             console.error(result.message);
//         }
//     } catch (error) {
//         console.error("Error updating appointment:", error);
//     }
// });// Extract patient ID from the URL


// const patientID = window.location.pathname.split('/').pop(); // Extracts '16' from '/patient-information/16'

// document.querySelector('.done-button').addEventListener('click', async () => {
//     // Extract form data
//     const effectiveDate = document.getElementById('date').value; // Date input
//     const startTime = document.getElementById('start-time').value; // Start time input

//     if (!effectiveDate || !startTime) {
//         alert('Please fill in all the required fields.');
//         return;
//     }

//     try {
//         // Send data to the backend
//         const response = await fetch('/update-effective-date', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ id: patientID, effectiveDate, startTime }),
//         });

//         if (response.ok) {
//             const result = await response.json();
//             alert(result.message);

//             // Optionally reload the page or update dynamically
//             location.reload(); // Reload to reflect changes (optional)
//         } else {
//             const error = await response.json();
//             alert(`Error: ${error.message}`);
//         }
//     } catch (error) {
//         console.error('Error updating effective date:', error);
//     }
// });

document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;
    const isPatientPage = currentPage.includes('/patient-information/');
    const patientID = isPatientPage ? currentPage.split('/').pop() : null;

    document.querySelector('.done-button').addEventListener('click', async () => {
        // Extract form data
        const name = document.getElementById('patient-name')?.value;
        const email = document.getElementById('email-todo')?.value?.trim();
        const contact = document.getElementById('phone-number')?.value?.trim();
        const effectiveDate = document.getElementById('date').value;
        const startTime = document.getElementById('start-time').value;
        const endTime = document.getElementById('end-time').value;
        const service = document.getElementById('treatment')?.value;
        if (!effectiveDate || !startTime || (!isPatientPage && (!name || !email || !contact))) {
            alert('Please fill in all the required fields.');
            return;
        }

        try {
            if (isPatientPage && patientID) {
                // For registered patients
                const response = await fetch('/update-effective-date', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: patientID, effectiveDate, startTime, endTime, service}),
                });

                if (response.ok) {
                    const result = await response.json();
                    alert(result.message);
                    location.reload();
                } else {
                    const error = await response.json();
                    alert(`Error: ${error.message}`);
                }
            } else {
                // For one-time patients
                const response = await fetch('/non-patient-appointment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, contact, effectiveDate, startTime, service}),
                });

                if (response.ok) {
                    const result = await response.json();
                    alert(result.message);
                    location.reload();
                } else {
                    const error = await response.json();
                    alert(`Error: ${error.message}`);
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An unexpected error occurred.');
        }
    });
});
