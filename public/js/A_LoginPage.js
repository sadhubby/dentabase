document.getElementById('login-button').addEventListener('click', async () => {
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('login-message');

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password }) 
        });

        if (response.ok) {
            const message = await response.text(); 
            loginMessage.style.color = 'green';
            loginMessage.textContent = "Login Successful";
            setTimeout(() => {
                window.location.href = '/to-do';
            }, 1000);
        } else {
            const error = await response.text();
            loginMessage.style.color = 'red';
            loginMessage.textContent = error; 
        }
    } catch (err) {
        console.error('Error logging in:', err);
        loginMessage.style.color = 'red';
        loginMessage.textContent = 'An error occurred. Please try again.';
    }
});
