function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;
                    resolve({ lat, long });
                },
                (error) => {
                    alert("Error obtaining location");
                    reject(error);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {

    // // Toggle display of owner input based on checkbox
    document.getElementById('user-type').addEventListener('change', function () {
        const ownerInput = document.getElementById('owner-input');
        ownerInput.style.display = this.checked ? 'block' : 'none';
    });

    // Functionality for the submit button
    document.getElementById('submitbtn').addEventListener('click', async function () {
        console.log('submitbtn clicked');
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const userTypeCheckbox = document.getElementById("user-type").checked;
        const type = userTypeCheckbox ? 'shop' : 'user';
        const location = await getLocation();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;

        // Data to be sent to the backend 
        const data = {
            request_type: 'new_auth',
            email: email,
            password: password,
            type: type,
            location: location,
            name: name,
            phone: phone,
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
});
