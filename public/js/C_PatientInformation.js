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

    //check for empty/null
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
                 religion : $('#occupation').val(),
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
        )


    })

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