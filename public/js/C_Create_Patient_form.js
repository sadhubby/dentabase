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
    $("#cancelBtn").click(function() {
        $("#patientFormModal").hide();
    });

    document.getElementById('create-patient-form').addEventListener('submit', function(event){
        event.preventDefault();

        $("#patientFormModal").hide();

        $.post(
            '/create-patient',
            {
                firstName : $('#firstName').val(),
                middleName : $('#middleName').val(),
                lastName : $('#lastName').val(),
                birthdate : $('#birthdate').val(),
                age : $('#age').val(),
                nickname : $('#nickname').val(),
                sex : $('#sex').val(),
                occupation : $('#occupation').val(),
                address : $('#address').val(),
                religion : $('#religion').val(),
                nationality : $('#nationality').val(),
                dentalInsurance : $('#insurance').val(),
                previousDentist : $('#previousDentist').val(),
                lastVisit : $('#lastVisit').val(),
                email : $('#email').val(),
                homeNo : $('#homeNo').val(),
                cellNo : $('#cellNo').val(),
                officeNo : $('#officeNo').val(),
                faxNo : $('#faxNo').val(),
                guardianName : $('#guardianName').val(),
                guardianOccupation: $('#guardianOccupation').val(),
                referral: $('#referral').val(),
                consultationReason : $('#consultationReason').val()
            },
            function(data){ //include status, success or fail
                alert(data.message);
                let tbody = document.getElementById('patient-table');

                const info = {
                    id: data.patientID,
                    firstName: $('#firstName').val(),
                    lastName: $('#lastName').val(),
                    contact: $('#cellNo').val(),
                    email: $('#email').val(),
                    homeAddress: $('#address').val()
                };

                const tr = document.createElement('tr');

                tr.innerHTML = `
                    <td>
                    <div class="name" onclick="window.location.href='/patient-information/${info.id}'" style="cursor: pointer;">
                        ${info.firstName} ${info.lastName}</div>
                    </td>
                    <td>
                    <div class="phone">${info.contact}</div>
                    </td>
                    <td>
                    <div class="email">${info.email}</div>
                    </td>
                    <td>
                    <div class="address">${info.homeAddress}</div>
                    </td>
                    <td>
                    <div class="next-visit">N/A</div>
                    </td>
                    <td>
                    <div class="treatment">N/A</div>
                    </td>
                `;

                tbody.appendChild(tr);



            }
        );
    })


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