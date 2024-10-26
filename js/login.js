document.getElementById('signupForm').addEventListener('submit', async function (event) {
    event.preventDefault();  // Prevents the default form submission behavior

    // Collecting form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Data to be sent to the backend
    const data = {
        request_type: 'check_auth',
        email: email,
        password: password,
    };

    try {
        // Sending POST request to backend
        const response = await fetch('http://127.0.0.1:8000/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log(result);  // Handle response from backend

        if (response.ok) {
            if (result.status == true) {
                alert('Login successful!');

                // localStorage.setItem('email', email);
                // localStorage.setItem('password', password);

                // Redirect to profile page
                window.location.href = '#';
            }
            else {
                alert(`Login failed: ${result.message}`);
            }
        } else {
            alert(`Sign-up failed: ${result.message}`);
        }

    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
    }
});
