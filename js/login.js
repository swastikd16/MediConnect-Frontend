document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('submitbtn').addEventListener('click', async function () {

        // Collecting form data
        console.log('submitbtn clicked');
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Data to be sent to the backend
        const data = {
            request_type: 'check_auth',
            email: email,
            password: password,

        };

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
                localStorage.setItem('email', email);

                // Get account type

                const data = {
                    request_type: 'check_account_type',
                    email: email,

                };

                // Sending POST request to backend
                const response = await fetch('http://127.0.0.1:8000/api/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();
                if (result.type == 'shop') {

                    window.location.href = 'ShopList.html';
                }
                else {
                    window.location.href = 'UserSearch.html';
                }
            }
            else {
                alert(`Login failed: ${result.message}`);
            }
        } else {
            alert(`Sign-up failed: ${result.message}`);
        }

    });
})
