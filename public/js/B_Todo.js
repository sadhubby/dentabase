$(document).ready(function(){
    $('.cancel-frame').click(function() {
        console.log("Cancel clicked");
        $('#form-container').hide();
        $('.overlay').hide();
    });

    $('.create-appointment-elements').click(function() {
        console.log("Create Appointment clicked");
        $('#form-container').show();
        $('.overlay').show();
    });

    $('.done-frame').click(function() {
        console.log("Create Appointment clicked");
        $('#form-container').hide();
        $('.overlay').hide();
    });
});
