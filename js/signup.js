document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('submitbtn').addEventListener('click', async function () {
        console.log('submitbtn clicked');
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const userTypeCheckbox = document.getElementById("user-type").checked;
        const type = userTypeCheckbox ? 'shop' : 'user';

        // Data to be sent to the backend 
        const data = {
            request_type: 'new_auth',
            email: email,
            password: password,
            type: type
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
                    alert('Sign-up successful!');
                }
                else {
                    alert(`Sign-up failed: ${result.message}`);
                }
            } else {
                alert(`Sign-up failed: ${result.message}`);
            }

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the form.');
        }
    });
})