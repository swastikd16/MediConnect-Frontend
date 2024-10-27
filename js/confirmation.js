// Mock data for booked medicines - ideally this would come from the previous page or backend.

const searchParams = new URLSearchParams(window.location.search);
const name = searchParams.get('name');
const quantity = searchParams.get('quantity');
const price = searchParams.get('price');

const bookedMedicines = [
    { name: name, quantity: quantity, price: quantity * price },
];

function displayMedicineDetails() {
    const detailsContainer = document.getElementById("medicine-details");
    let detailsHTML = "<h5>Medicine Details:</h5><ul>";

    bookedMedicines.forEach(medicine => {
        detailsHTML += `
            <li><strong>Name:</strong> ${medicine.name} <br>
            <strong>Quantity:</strong> ${medicine.quantity} <br>
            <strong>Price:</strong> ${medicine.price}</li><hr>
        `;
    });

    detailsHTML += "</ul>";
    detailsContainer.innerHTML = detailsHTML;
}

// Redirect to the homepage (or main list page)
function goToHomePage() {
    window.location.href = "index.html";  // Replace with your homepage URL
}

// Initialize the page
document.addEventListener("DOMContentLoaded", displayMedicineDetails);