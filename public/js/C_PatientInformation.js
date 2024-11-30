const closeUploadPictureBtn = document.getElementById('close-upload-picture');
const addPicBtn = document.getElementById('open-upload-popup');

async function submitData(){
    const birthdate_string = document.getElementById('birthdate');
    const[month, day, year] = birthdate_string.split('/');
    const birthdate = new Date(`${month}/${day}/${year}`);

    

    const patientData = {
        birthdate,

    }
}

closeUploadPictureBtn.addEventListener('click', function(){
    $('#upload-picture-popup').hide();
})

addPicBtn.addEventListener('click', function(){
    $('#upload-picture-popup').show();
})




function fillMedicalFields(physicianName, physicianOfficeAddress, physicianSpecialty, physicianOfficeNumber, prescription
    , illnessOrSurgery, condition, isUsingTobacco, isAlcoholOrDrugs, isPregnant, isNursing, isBirthControlPills, allergies, healthProblems){

        if(physicianName != "N/A"){
            $('#physician-name').val(physicianName);
        }

        if(physicianOfficeAddress != "N/A"){
            $('#office-address').val(physicianOfficeAddress);
        }

        if(physicianSpecialty != "N/A"){
            $('#specialty').val(physicianSpecialty);
        }

        if(physicianOfficeNumber != "N/A"){
            $('#office-number').val(physicianOfficeNumber);
        }

        if(prescription != "N/A"){
            if(prescription != "None"){
                $('#prescription-yes').prop('checked', true);
                $('#prescription-details').val(prescription);
            } else {
                $('#prescription-no').prop('checked', true);
            }
        }

        if(illnessOrSurgery != "N/A"){
            if(illnessOrSurgery != "None"){
                $('#illness-yes').prop('checked', true);
                $('#illness-details').val(illnessOrSurgery);
            }else {
                $('#illness-no').prop('checked', true);
            }
        } 

        if(condition != "N/A"){
            if(condition != "None"){
                $('#medical-treatment-yes').prop('checked', true);
                $('#condition-details').val(condition);
            } else {
                $('#medical-treatment-no').prop('checked', true);
            }
        }


        if(isUsingTobacco != "N/A"){
            if(isUsingTobacco == "true"){
                $('#tobacco-yes').prop('checked', true);
            } else {
                $('#tobacco-no').prop('checked', true);
            }
        }

        if(isAlcoholOrDrugs != "N/A"){
            if(isAlcoholOrDrugs == "true"){
                $('#alcohol-yes').prop('checked', true);
            } else {
                $('#alcohol-no').prop('checked', true);
            }
        }

        if(isPregnant != "N/A"){
            if(isPregnant == "true"){
                $('#pregnant-yes').prop('checked', true);
            } else {
                $('#pregnant-no').prop('checked', true);
            }
        }

        if(isNursing != "N/A"){
            if(isNursing == "true"){
                $('#nursing-yes').prop('checked', true);
            } else {
                $('#nursing-no').prop('checked', true);
            }
        }

        if(isBirthControlPills != "N/A"){
            if(isBirthControlPills == "true"){
                $('#birth-control-yes').prop('checked', true);
            } else {
                $('#birth-control-no').prop('checked', true);
            }
        }

        if(allergies.length !== 0 && allergies[0] != "None"){
            $('#allergy-yes').prop('checked', true);
        }

        if(allergies [0] == "None"){
            $('#allergy-no').prop('checked', true);
        } else {
            allergies.forEach(function(allergy){
                switch(allergy){
                    case "Lidocaine":
                        $('#lidocaine').prop('checked', true);
                        break;
                    case "Penicillin":
                        $('#penicillin').prop('checked', true);
                        break;
                    case "Antibiotics":
                        $('#antibiotics').prop('checked', true);
                        break;
                    case "Sulfa drugs":
                        $('#sulfa-drugs').prop('checked', true);
                        break;
                    case "Aspirin":
                        $('#aspirin').prop('checked', true);
                        break;
                    case "Latex":
                        $('#latex').prop('checked', true);
                        break;
                    default:
                        $('#allergy-details').val(allergy);
    
                }
            });
        }


        healthProblems.forEach(function(problem){
            switch(problem){
                case "High Blood Pressure":
                    $('#high-blood-pressure').prop('checked', true);
                    break;
                case "Low Blood Pressure":
                    $('#low-blood-pressure').prop('checked', true);
                    break;
                case "Epilepsy":
                    $('#epilepsy').prop('checked', true);
                    break;
                case "AIDS":
                    $('#aids-hiv').prop('checked', true);
                    break;
                case "STD":
                    $('#std').prop('checked', true);
                    break;
                case "Stomach Troubles":
                    $('#stomach-troubles').prop('checked', true);
                    break;
                case "Fainting Seizure":
                    $('#fainting-seizure').prop('checked', true);
                    break;
                case "Rapid Weight Loss":
                    $('#rapid-weight-loss').prop('checked', true);
                    break;
                case "Radiation Therapy":
                    $('#radiation-therapy').prop('checked', true);
                    break;
                case "Joint Replacement":
                    $('#joint-replacement').prop('checked', true);
                    break;
                case "Heart Surgery":
                    $('#heart-surgery').prop('checked', true);
                    break;
                case "Heart Attack":
                    $('#heart-attack').prop('checked', true);
                    break;
                case "Thyroid Problem":
                    $('#thyroid-problem').prop('checked', true);
                    break;
                case "Heart Disease":
                    $('#heart-disease').prop('checked', true);
                    break;
                case "Heart Murmur":
                    $('#heart-murmur').prop('checked', true);
                    break;
                case "Hepatitis / Liver Disease":
                    $('#hepatitis-liver').prop('checked', true);
                    break;
                case "Rheumatic Fever":
                    $('#rheumatic-fever').prop('checked', true);
                    break;
                case "Hay Fever":
                    $('#hay-fever').prop('checked', true);
                    break;
                case "Respiratory Problem":
                    $('#respiratory-problem').prop('checked', true);
                    break;
                case "Hepatitis / Jaundice":
                    $('#hepatitis-jaundice').prop('checked', true);
                    break;
                case "Tuberculosis":
                    $('#tuberculosis').prop('checked', true);
                    break;
                case "Swollen Ankles":
                    $('#swollen-ankles').prop('checked', true);
                    break;
                case "Kidney Disease":
                    $('#kidney-disease').prop('checked', true);
                    break;
                case "Diabetes":
                    $('#diabetes').prop('checked', true);
                    break;
                default:
                    console.log("Condition not recognized: " + problem);
            }
            
        });

    }

    $('#update-medical-history-form').on('submit', function(event){
        event.preventDefault();

        let medicalTreatment;
        let illnessOrSurgery;
        let prescription;
        let isTobacco;
        let isAlcohol;
        let checkedAllergies = [];

        let isPregnant = "None";
        let isNursing = "None";
        let isBirthControl = "None";

        let healthProblems = [];

        if($('#medical-treatment-yes').prop('checked')){
            medicalTreatment = $('#condition-details').val();
        } else if ($('#medical-treatment-no').prop('checked')){
            medicalTreatment = "None";
        } else {
            alert("Missing info. Please answer all Yes/No questions.");
            return;
        }

        if($('#illness-yes').prop('checked')){
            illnessOrSurgery = $('#illness-details').val();
        } else if ($('#illness-no').prop('checked')){
            illnessOrSurgery = "None";
        } else {
            alert("Missing info. Please answer all Yes/No questions.");
            return;
        }

        if($('#prescription-yes').prop('checked')){
            prescription = $('#prescription-details').val();
        } else if ($('#prescription-no').prop('checked')){
            prescription = 'None';
        } else {
            alert('Missing info. Please answer all Yes/No questions.');
            return;
        }

        if($('#tobacco-yes').prop('checked')){
            isTobacco = true;
        } else if($('#tobacco-no').prop('checked')){
            isTobacco = false;
        } else {
            alert('Missing info. Please answer all Yes/No questions.');
            return;
        }

        if($('#alcohol-yes').prop('checked')){
            isAlcohol = true;
        } else if($('#alcohol-no').prop('checked')){
            isAlcohol = false;
        } else {
            alert('Missing info. Please answer all Yes/No questions.');
            return;
        }

        if($('#allergy-yes').prop('checked')){
            checkedAllergies = $('input[name="allergy-options"]:checked').map(function() {
                return this.value;
            }).get();

            if($('#allergy-details').val() != ""){
                checkedAllergies.push($('#allergy-details').val());
            }
        
            if (checkedAllergies.length == 0) {
                alert('No allergies selected.');
                return;
            }
        } else if($('#allergy-no').prop('checked')){
            checkedAllergies.push('None');
        } else {
            alert('Missing info. Please answer all Yes/No questions.');
            return;
        }

        if($('#pregnant-yes').prop('checked')){
            isPregnant = true;
        } else if($('#pregnant-no').prop('checked')){
            isPregnant = false;
        }

        if($('#nursing-yes').prop('checked')){
            isNursing = true;
        } else if ($('#nursing-no').prop('checked')){
            isNursing = false;
        }

        if($('#birth-control-yes').prop('checked')){
            isBirthControl = true;
        } else if ($('#birth-control-no').prop('checked')){
            isBirthControl = false;
        }

        healthProblems = $('input[name="conditions"]:checked').map(function() {
            return this.value;
        }).get();



        console.log($('#specialty').val());
        
        $.post(
            '/update-medical-history',
            {
                patientID : $(this).data('id'),
                physicianName : $('#physician-name').val(),
                physicianSpecialty: $('#specialty').val(),
                physicianOfficeAddress: $('#office-address').val(),
                physicianOfficeNumber: $('#office-number').val(),

                medicalTreatment : medicalTreatment,
                illnessOrSurgery : illnessOrSurgery,
                prescription: prescription,
                isTobacco : isTobacco,
                isAlcohol : isAlcohol,
                allergies : checkedAllergies,

                isPregnant : isPregnant,
                isNursing : isNursing,
                isBirthControl : isBirthControl,

                healthProblems : healthProblems
            },
            function(status){
                alert(status);
            }
        );
    });

    $('#update-patient-form').on('submit', function(event){
        event.preventDefault();

        $.post(
            '/update-patient',
            {
                 patientID : $(this).data('id'),
                 birthdate : $('#birthdate').val(),
                 age : $('#age').val(),
                 nickname : $('#nickname').val(),
                 sex : $('#sex').val(),
                 occupation : $('#occupation').val(),
                 address : $('#address').val(),
                 religion : $('#religion').val(),
                 nationality : $('#nationality').val(),
                 dentalInsurance : $('#insurance').val(),

                 lastDentist : $('#previous-dentist').val(),
                 lastDentalVisit : $('#last-visit').val(),

                 email : $('#email').val(),
                 homeNo : $('#home-no').val(),
                 mobileNo : $('#mobile-no').val(),
                 officeNo : $('#office-no').val(),
                 faxNo : $('#fax-no').val(),

                 guardianName : $('#guardian-name').val(),
                 guardianOccupation : $('#guardian-occupation').val(),
                 referral : $('#referral-source').val(),
                 consultationReason : $('#consultation-reason').val()
            },
            function(status){
                alert(status);
            }
        );


    })

    $('#create-treatment-record').on('click', function(){
        $('#create-treatment-popup').show();
    });

    $('#close-create-treatment').on('click', function(){
        $('#create-treatment-popup').hide();
    });

    document.getElementById('treatment-form').addEventListener('submit', function(event){
        event.preventDefault();

        const procedureDate = $('#procedureDate').val();
        const procedureName = $('#procedureName').val();
        const dentistName = $('#dentistName').val();
        const amountCharged = $('#amountCharged').val();
        const amountPaid = $('#amountPaid').val();
        const nextAppointmentDate = $('#nextAppointment').val();

        let teethAffected = [];

        for(ctr = 1; ctr <= 32; ctr++){
            if($('#tooth' + ctr).is(':checked')){
                teethAffected.push(ctr);
            }
        }

        $('#create-treatment-popup').hide();
        $.post(
            '/create-treatment',
            {
                patientID : $('#treatment-form').data('id'),
                procedureDate : procedureDate,
                procedureName: procedureName,
                dentistName : dentistName,
                amountCharged : amountCharged,
                amountPaid : amountPaid,
                nextAppointmentDate : nextAppointmentDate,
                teethAffected : teethAffected
            },
            function(){ //include status, success or fail
                const teethString = teethAffected.join(', ');
                const newRow = `
                <tr>
                    <td><div class="treatment-history-text">${procedureDate}</div></td>
                    <td><div class="treatment-history-text">${teethString}</div></td>
                    <td><div class="treatment-history-text">${procedureName}</div></td>
                    <td><div class="treatment-history-text">${amountCharged}</div></td>
                    <td><div class="treatment-history-text">${amountPaid}</div></td>
                </tr>
                `;

                $('#treatment-table-body').append(newRow);


                alert('Treatment recorded successfully.');
            }
        );
    });

    
    document.getElementById('uploadForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData();
        const imageFile = document.getElementById('imageInput').files[0];
        const imageDate = document.getElementById('imageDate').value;
        const imageCaption = document.getElementById('imageCaption').value;
        const patientID = $('#upload-picture-popup').data('id');

        formData.append('file', imageFile);
        formData.append('date', imageDate);
        formData.append('caption', imageCaption); //case when empty
        formData.append('patientID', patientID);

        console.log(imageDate);
        console.log(imageCaption);

        $('#upload-picture-popup').hide();
        fetch('/upload-pic', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert('Successfully uploaded file.');
        })
        .catch(error => {
            alert('Error uploading file');
        });

    });


    document.addEventListener("DOMContentLoaded", function () {
        const patientFullName = document.querySelector(".name-group").textContent.trim().split("|")[0].trim();
        const patientAge = document.querySelector(".name-group").textContent.trim().split("|")[1].trim();
        const patientSex = document.querySelector(".name-group").textContent.trim().split("|")[2].trim();
        const email = document.getElementById("email") ? document.getElementById("email").value : "";
        const phone = document.getElementById("mobile-no") ? document.getElementById("mobile-no").value : "";
    
        // Get the "Add To Do" button and the form
        const addToDoButton = document.querySelector(".create-appointment-elements");
        const toDoForm = document.querySelector(".overlay.todo-form-file");

        $("#save-informed-consent-form").on("submit", function(event){
            event.preventDefault();
            let patientID = document.getElementById("buttons-group-deactivate").getAttribute('data-id');

            $.post(
                "/fill-consent",
                {
                    patientID: patientID,
                    consentName: $("#consent-name").val(),
                    consentDate: $('#consent-date').val()
                },
                function(data){
                    alert(data.message);
                }
            )
        })


        document.getElementById("save-footnote-button").addEventListener("click", function(){
            let patientID = document.getElementById("buttons-group-deactivate").getAttribute('data-id');

            $.post(
                "/edit-footnote",
                {
                    patientID: patientID,
                    footnote: $("#footer-note").val()
                },
                function(data){
                    alert(data.message);
                }

            )
        });


        document.getElementById("deactivate-patient-button").addEventListener("click", function (){
            let patientID = document.getElementById("buttons-group-deactivate").getAttribute('data-id');
            
            $.post(
                "/deactivate-patient",
                {
                    patientID: patientID
                },
                function(data){
                    if(data.state == true) {
                        alert('Patient has been successfully deactivated.');
                    } else {
                        alert('Error in deactivating patient.');
                    }
                }
            )
        });
    
        addToDoButton.addEventListener("click", function () {
            if (toDoForm) {
                const patientNameField = document.getElementById('patient-name');
                const emailField = document.getElementById('email-todo');
                const phoneField = document.getElementById('phone-number');
    
                if (patientNameField) {
                    patientNameField.value = patientFullName;
                }
                if (emailField) {
                    emailField.value = email;
                }
                if (phoneField) {
                    phoneField.value = phone;
                }
    
                toDoForm.style.display = "block";
            }
        });
    });
    

$(document).ready(function () {
    // Open the image overlay when an image is clicked
    $('.image-item img').on('click', function () {
        const src = $(this).attr('src');
        $('#enlarged-image').attr('src', src);
        $('#image-overlay').css('display', 'flex');
    });

    // Close the overlay when the close button is clicked
    $('#image-overlay .close-button').on('click', function () {
        $('#image-overlay').css('display', 'none');
    });

    // Close the overlay when clicking outside the enlarged image
    $('#image-overlay').on('click', function (e) {
        if ($(e.target).is('#image-overlay')) {
            $('#image-overlay').css('display', 'none');
        }
    });
});

