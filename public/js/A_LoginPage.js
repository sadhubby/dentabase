// $(document).ready(function () {
//     $('#login-button').click(function (event) {
//         event.preventDefault(); // Prevent the default form submission

//         const password = $('#password').val(); // Get the password from input

//         // Send an AJAX request to the /login route
//         $.ajax({
//             url: '/login', // Make sure this matches the server route
//             type: 'POST',
//             contentType: 'application/json',
//             data: JSON.stringify({ password: password }), // Send password as JSON
//             success: function (response) {
//                 // Display a success message
//                 alert(response); // Or update DOM element
//                 $('#login-message').text(response).css('color', 'green');
//             },
//             error: function (xhr) {
//                 // Display an error message
//                 alert(xhr.responseText); // Or update DOM element
//                 $('#login-message').text(xhr.responseText).css('color', 'red');
//             }
//         });
//     });
// });


$(document).ready(function () {
    $('#login-button').click(function (event) {
        event.preventDefault(); 

        const password = $('#password').val(); // Get the password from input

        console.log("Password entered:", password); // Debugging log

        $.ajax({
            url: '/login', // Ensure this matches the server route
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ password: password }), // Send password as JSON
            success: function (response) {
                console.log("Login successful:", response);
                $('#login-message').text(response).css('color', 'green');
            },
            error: function (xhr) {
                console.log("Login failed:", xhr.responseText);
                $('#login-message').text(xhr.responseText).css('color', 'red');
            }
        });
    });
});
