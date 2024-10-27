// Get references to the input field and suggestions container
const searchInput = document.getElementById('search-input');
const suggestionsBox = document.getElementById('suggestions');

// Mock list of medicines for demonstration purposes

async function getMedicines() {
    const data = {
        request_type: 'get_all_med',

    };

    // Sending POST request to backend
    const response = await fetch('http://127.0.0.1:8000/api/medicine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    return result.medicines;
}

async function main() {


    const medicines = await getMedicines();

    // Function to display suggestions based on input
    searchInput.addEventListener('input', () => {
        const input = searchInput.value.toLowerCase();
        suggestionsBox.innerHTML = ''; // Clear previous suggestions

        if (input) {
            // Filter medicines based on the input text
            const filteredMedicines = medicines.filter(medicine =>
                medicine.toLowerCase().includes(input)
            );

            // Show filtered medicines as suggestions
            filteredMedicines.forEach(medicine => {
                const suggestionItem = document.createElement('div');
                suggestionItem.textContent = medicine;

                // When a suggestion is clicked, navigate to the medicine's page
                suggestionItem.addEventListener('click', () => {
                    window.location.href = `/NearbyShops.html?medicine_name=${encodeURIComponent(medicine)}`;
                });

                suggestionsBox.appendChild(suggestionItem);
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', main);