
/* 1ST CARD MONTHLY APPOINTMENT CHART */
function initializeAppointmentChart() {
    // Initial data for the chart
    const appointmentData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"], // Months
        datasets: [{
            label: 'Number of Appointments',
            data: [20, 30, 15, 5, 10, 18, 25, 12, 17, 22, 28, 35], // Monthly appointments
            backgroundColor: ['#000080', '#909eee'], // Bar colors
            borderWidth: 1,
        }]
    };

    // Chart configuration
    const config = {
        type: 'bar', // Bar chart type (horizontal)
        data: appointmentData,
        options: {
            responsive: true, // Ensures chart resizes with container
            maintainAspectRatio: false, // Allows custom width/height

            plugins: {
                legend: {
                    display: false, // Hide legend
                },
                tooltip: {
                    enabled: true, // Enable tooltips on hover
                    callbacks: {
                        label: function (context) {
                            const month = context.label; // The month name from labels
                            const year = month === "Dec" ? "2024" : "2025"; // Adjust year for Dec
                            const value = context.raw; // The value of the bar
                            return `${month} ${year}: ${value} Appointments`; // Tooltip text
                        },
                    },
                },
               
            },

            indexAxis: 'y', // Swap axes: 'y' makes the bar chart horizontal

            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Number of Appointments', // Number of appointments on the x-axis
                        font: {
                            size: 14,
                            weight: 'bold',
                        },
                    },
                    beginAtZero: true, // Start x-axis from 0
                    ticks: {
                        maxRotation: 45, // Rotate the x-axis labels if needed
                        minRotation: 0,
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Month', // Months on the y-axis
                        font: {
                            size: 14,
                            weight: 'bold',
                        },
                    },
                },
            },
        },
    };

    // Initialize the chart
    const ctx = document.getElementById('appointmentsChart').getContext('2d');
    const appointmentsChart = new Chart(ctx, config);

    // Toggle Add Appointment Form visibility
    document.getElementById('toggleFormButton').addEventListener('click', function () {
        const form = document.getElementById('add-appointment-form');
        form.classList.toggle('hidden');
    });
}

// Call the function to initialize the chart when the page is loaded
document.addEventListener('DOMContentLoaded', initializeAppointmentChart);


/*========================================================== */
// 2ND CARD Toggle the visibility of the filter dropdown
function toggleFilterDropdown() {
    const dropdown = document.getElementById('filterDropdown');
    dropdown.classList.toggle('show'); // Toggle 'show' class to display or hide
}

// Filter patients based on selected month
function filterPatientsByMonth() {
    const selectedMonth = document.getElementById('monthSelect').value;
    const rows = document.querySelectorAll('#patientTableBody tr');

    rows.forEach(row => {
        const appointmentMonth = row.getAttribute('data-appointment-month');
        if (selectedMonth === 'all' || appointmentMonth === selectedMonth) {
            row.style.display = ''; // Show the row
        } else {
            row.style.display = 'none'; // Hide the row
        }
    });
}


/* 3RD CARD FREQUENCY CHART */
function initializeTreatmentChart() {
    // Initial data for the chart
    const treatmentData = {
        labels: ["Braces", "Invisalign", "Retainers"], // Treatment Types
        datasets: [{
            label: 'Number of Patients',
            data: [10, 7, 5], // Corresponding frequencies
            backgroundColor: ['#000080', '#909eee'], // Bar colors
            borderWidth: 1,
        }]
    };

    // Chart configuration
    const config = {
        type: 'bar',
        data: treatmentData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false, // Hides the legend box
                },
                tooltip: {
                    enabled: true, // Enables tooltips on hover
                },
            },
            indexAxis: 'y', // Make the bars horizontal (switch axes)
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Number of Patients',
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                    },
                    beginAtZero: true, // Starts the x-axis from 0
                },
                y: {
                    title: {
                        display: true,
                        text: 'Treatment Types',
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                    },
                }
            }
        }
    };

    // Initialize the chart
    const ctx = document.getElementById('frequencyChart').getContext('2d');
    const frequencyChart = new Chart(ctx, config);

    // Function to update the remove dropdown dynamically
    function updateRemoveDropdown() {
        const removeDropdown = document.getElementById('removeTreatmentSelect');
        removeDropdown.innerHTML = ''; // Clear existing options

        // Populate the dropdown with current treatments
        treatmentData.labels.forEach(treatment => {
            const option = document.createElement('option');
            option.value = treatment;
            option.textContent = treatment;
            removeDropdown.appendChild(option);
        });
    }

    // Initialize the dropdown on page load
    updateRemoveDropdown();

    // Toggle the Add Treatment Form visibility
    document.getElementById('toggleFormButton').addEventListener('click', function () {
        const form = document.getElementById('add-treatment-form');
        form.style.display = form.style.display === 'none' || form.style.display === '' ? 'block' : 'none';
    });

    // Toggle the Remove Treatment Form visibility
    document.getElementById('removeTreatmentButton').addEventListener('click', function () {
        const form = document.getElementById('remove-treatment-form');
        form.style.display = form.style.display === 'none' || form.style.display === '' ? 'block' : 'none';
    });

    // Submit a new treatment to the chart
    document.getElementById('submitTreatmentButton').addEventListener('click', function () {
        const treatmentSelect = document.getElementById('treatmentSelect');
        const selectedTreatment = treatmentSelect.value;

        const treatmentIndex = treatmentData.labels.indexOf(selectedTreatment);

        if (treatmentIndex === -1) {
            // Add new treatment if it doesn't already exist
            treatmentData.labels.push(selectedTreatment);
            treatmentData.datasets[0].data.push(0); // Initialize with 0 patients
            updateRemoveDropdown(); // Update the dropdown
        } else {
            alert("This treatment already exists!");
        }

        // Update the chart with new data
        frequencyChart.update();

        // Hide the form after submitting
        document.getElementById('add-treatment-form').style.display = 'none';
    });

    // Remove a treatment from the chart
    document.getElementById('submitRemoveTreatmentButton').addEventListener('click', function () {
        const treatmentSelect = document.getElementById('removeTreatmentSelect');
        const selectedTreatment = treatmentSelect.value;

        const treatmentIndex = treatmentData.labels.indexOf(selectedTreatment);

        if (treatmentIndex !== -1) {
            // Remove the treatment from the chart
            treatmentData.labels.splice(treatmentIndex, 1);
            treatmentData.datasets[0].data.splice(treatmentIndex, 1);

            // Update the chart and dropdown
            frequencyChart.update();
            updateRemoveDropdown();
        } else {
            alert("Treatment not found! Please try again.");
        }

        // Hide the form after submitting
        document.getElementById('remove-treatment-form').style.display = 'none';
    });
}

// Call the function to initialize the chart when the page is loaded
document.addEventListener('DOMContentLoaded', initializeTreatmentChart);



/*================================================================================*/






