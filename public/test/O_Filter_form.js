// Function to toggle the filter form visibility
function toggleFilterForm() {
    const filterForm = document.getElementById("filterForm");
    filterForm.style.display = filterForm.style.display === "block" ? "none" : "block";
}

// Function to apply the filters and show the results
function applyFilters() {
    const treatmentType = document.getElementById("treatmentType").value;
    const date = document.getElementById("date").value;
    const patientName = document.getElementById("patientName").value;
    const patientNameSort = document.getElementById("patientNameSort").value;
    const lastVisitSort = document.getElementById("lastVisitSort").value;

    const resultText = `
        <p><strong>Treatment Type:</strong> ${treatmentType || "All"}</p>
        <p><strong>Date:</strong> ${date || "Any"}</p>
        <p><strong>Patient Name Search:</strong> ${patientName || "Any"}</p>
        <p><strong>Patient Name Sort:</strong> ${patientNameSort}</p>
        <p><strong>Last Visit Sort:</strong> ${lastVisitSort}</p>
    `;

    alert("Filters Applied:\n" + resultText);
}

// Function to close the filter form
function closeForm() {
    const filterForm = document.getElementById("filterForm");
    filterForm.style.display = "none";
}

document.getElementById('procedure-filter').addEventListener('click', function() {
    var form = document.getElementById('filterForm');
    form.style.display = form.style.display === 'none' || form.style.display === '' ? 'block' : 'none';
});
