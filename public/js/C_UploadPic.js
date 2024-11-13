$(document).ready(function() {
    $("#open-upload-popup").on("click", function() {
        $("#upload-picture-popup").show();
        $("#overlay").show();
    });

    $("#close-upload-picture").on("click", function() {
        $("#upload-picture-popup").hide();
        $("#overlay").hide();
    });
    

    $("#overlay").on("click", function() {
        $("#upload-picture-popup").hide();
        $("#overlay").hide();
    });
});
