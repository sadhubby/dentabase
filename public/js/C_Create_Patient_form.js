$(document).ready(function() {
    // Show modal when the create patient element is clicked
    $(".create-patient-elements").click(function() {
        $("#patientFormModal").show();
    });

    // Show modal when the openFormBtn is clicked
    $("#openFormBtn").click(function() {
        $("#patientFormModal").show();
    });

    // Close modal when cancelBtn or doneBtn is clicked
    $("#cancelBtn, #doneBtn").click(function() {
        $("#patientFormModal").hide();
    });
});


//document.addEventListener("DOMContentLoaded", function() {
    //document.getElementsByClassName("create-patient-elements").onclick = function() {
        //document.getElementById("patientFormModal").style.display = "block";
    //};

    //document.getElementById("openFormBtn").onclick = function() {
    //    document.getElementById("patientFormModal").style.display = "block";
    //};

    //document.getElementById("cancelBtn").onclick = function() {
        //document.getElementById("patientFormModal").style.display = "none";
    //};

    //document.getElementById("doneBtn").onclick = function() {
        //document.getElementById("patientFormModal").style.display = "none";
    //};
//});