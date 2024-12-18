$(document).ready(function(){

    document.getElementById('active-orthodontics-form').addEventListener('submit', function(event){
        event.preventDefault();

        let selectedValues = [];

        let checkedActive = document.getElementsByName('active-patient-row');



        checkedActive.forEach(checkbox => {
            if(checkbox.checked){
                selectedValues.push(checkbox.value);
            }
        });

        if(selectedValues.length === 0){
            return;
        }

        $.post(
            '/deactivate-ortho',
            {
                orthos: selectedValues
            },
            function(data){ //case if successful or fail
                alert(data.message);

                checkedActive.forEach(checkbox => {
                    if(checkbox.checked){
                        checkbox.closest('tr').remove();
                    }
                });

                $('#active-patients-count').text("Active Patients: " + data.count);
            }
        );
    })
});
/* 1ST CARD MONTHLY APPOINTMENT CHART */
function initializeAppointmentChart() {
    let monthlyAppointments = getMonthlyCounts();
    // Initial data for the chart
    const appointmentData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"], // Months
        datasets: [{
            label: 'Number of Appointments',
            data: monthlyAppointments, // Monthly appointments
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
                        stepSize: 1, // Ensure only whole numbers are displayed
                        callback: function (value) {
                            return Number.isInteger(value) ? value : null; // Show only whole numbers
                        },
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

/*function toggleFilterDropdown() {
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
*/

/*========================================================== */
//3RD CARD FREQUENCY DISTRIBUTION
function initializeServiceChart() {
    // Sample data for services per month
    let yearlyFrequencyCount = getYearFrequency();

    const serviceDataByMonth = {
        Jan: { labels: yearlyFrequencyCount.JanServices, data: yearlyFrequencyCount.JanCounts },
        Feb: { labels: yearlyFrequencyCount.FebServices, data: yearlyFrequencyCount.FebCounts },
        Mar: { labels: yearlyFrequencyCount.MarServices, data: yearlyFrequencyCount.MarCounts },
        Apr: { labels: yearlyFrequencyCount.AprServices, data: yearlyFrequencyCount.AprCounts },
        May: { labels: yearlyFrequencyCount.MayServices, data: yearlyFrequencyCount.MayCounts },
        Jun: { labels: yearlyFrequencyCount.JunServices, data: yearlyFrequencyCount.JunCounts },
        Jul: { labels: yearlyFrequencyCount.JulServices, data: yearlyFrequencyCount.JulCounts },
        Aug: { labels: yearlyFrequencyCount.AugServices, data: yearlyFrequencyCount.AugCounts },
        Sep: { labels: yearlyFrequencyCount.SepServices, data: yearlyFrequencyCount.SepCounts },
        Oct: { labels: yearlyFrequencyCount.OctServices, data: yearlyFrequencyCount.OctCounts },
        Nov: { labels: yearlyFrequencyCount.NovServices, data: yearlyFrequencyCount.NovCounts },
        Dec: { labels: yearlyFrequencyCount.DecServices, data: yearlyFrequencyCount.DecCounts },
        All: { labels: yearlyFrequencyCount.yearlyUniqueProcedures, data: yearlyFrequencyCount.yearlyCounts }
    };

    // Initialize chart data
    const serviceData = {
        labels: [...serviceDataByMonth.All.labels], // Clone array to prevent reference issues
        datasets: [{
            label: 'Number of Patients',
            data: [...serviceDataByMonth.All.data],
            backgroundColor: ['#000080', '#909eee'],
            borderWidth: 1,
        }]
    };

    // Chart configuration
    const config = {
        type: 'bar',
        data: serviceData,
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: true },
            },
            indexAxis: 'y',
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Number of Patients',
                        font: { size: 14, weight: 'bold' },
                    },
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1, // Ensure only whole numbers are displayed
                        callback: function (value) {
                            return Number.isInteger(value) ? value : null; // Show only whole numbers
                        },
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Service Types',
                        font: { size: 14, weight: 'bold' },
                    },
                }
            }
        }
    };

    // Create the chart
    const ctx = document.getElementById('frequencyChart').getContext('2d');
    const frequencyChart = new Chart(ctx, config);

    // Update Remove Dropdown dynamically
    function updateRemoveDropdown() {
        const removeDropdown = document.getElementById('removeServiceSelect');
        removeDropdown.innerHTML = ''; // Clear existing options

        // Populate the dropdown with current services
        serviceData.labels.forEach(service => {
            const option = document.createElement('option');
            option.value = service;
            option.textContent = service;
            removeDropdown.appendChild(option);
        });
    }

    // Initialize dropdown on page load
    updateRemoveDropdown();

    // Toggle Filter by Month visibility
    const toggleFilterButton = document.getElementById('toggleFilterButton');
    const monthFilterContainer = document.getElementById('monthFilterContainer');

    toggleFilterButton.addEventListener('click', () => {
        if (monthFilterContainer.classList.contains('hidden')) {
            monthFilterContainer.classList.remove('hidden');
        } else {
            monthFilterContainer.classList.add('hidden');
        }
    });

    // Apply month filter
    document.getElementById('applyFilterButton').addEventListener('click', () => {
        const selectedMonth = document.getElementById('monthSelect').value;


        const filteredData = serviceDataByMonth[selectedMonth] || serviceDataByMonth.All;

        // Update the chart data
        serviceData.labels = [...filteredData.labels]; // Clone the array to avoid direct reference issues
        serviceData.datasets[0].data = [...filteredData.data];
        frequencyChart.update();
    });

    // Toggle the Add Service Form visibility
    document.getElementById('toggleFormButton').addEventListener('click', function () {
        const form = document.getElementById('add-service-form');
        form.style.display = form.style.display === 'none' || form.style.display === '' ? 'block' : 'none';
    });

    // Toggle the Remove Service Form visibility
    document.getElementById('removeServiceButton').addEventListener('click', function () {
        const form = document.getElementById('remove-service-form');
        form.style.display = form.style.display === 'none' || form.style.display === '' ? 'block' : 'none';
    });

    // Add a new service
    document.getElementById('submitServiceButton').addEventListener('click', function () {
        const serviceSelect = document.getElementById('serviceSelect');
        const selectedService = serviceSelect.value;

        // Check if service already exists
        if (!serviceData.labels.includes(selectedService)) {
            serviceData.labels.push(selectedService);
            serviceData.datasets[0].data.push(0); // Initialize with 0 patients for All data
            updateRemoveDropdown(); // Update dropdown

            // Update all month data if required
            serviceDataByMonth.All.labels.push(selectedService);
            serviceDataByMonth.All.data.push(0);
        } else {
            alert("This service already exists!");
        }

        // Update the chart
        frequencyChart.update();

        // Hide the form
        document.getElementById('add-service-form').style.display = 'none';
    });

    // Remove a service
    document.getElementById('submitRemoveServiceButton').addEventListener('click', function () {
        const serviceSelect = document.getElementById('removeServiceSelect');
        const selectedService = serviceSelect.value;

        const serviceIndex = serviceData.labels.indexOf(selectedService);

        if (serviceIndex !== -1) {
            // Remove from main chart data
            serviceData.labels.splice(serviceIndex, 1);
            serviceData.datasets[0].data.splice(serviceIndex, 1);

            // Remove from all month data
            Object.keys(serviceDataByMonth).forEach(month => {
                const monthIndex = serviceDataByMonth[month].labels.indexOf(selectedService);
                if (monthIndex !== -1) {
                    serviceDataByMonth[month].labels.splice(monthIndex, 1);
                    serviceDataByMonth[month].data.splice(monthIndex, 1);
                }
            });

            // Update dropdown
            updateRemoveDropdown();

            // Update the chart
            frequencyChart.update();
        } else {
            alert("Service not found!");
        }

        // Hide the form
        document.getElementById('remove-service-form').style.display = 'none';
    });
}

// Initialize the chart when the page loads
document.addEventListener('DOMContentLoaded', initializeServiceChart);



/*================================================================================*/






