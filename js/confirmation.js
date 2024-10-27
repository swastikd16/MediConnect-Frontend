// Mock data for booked medicines - ideally this would come from the previous page or backend.
const bookedMedicines = [
    { name: "Paracetamol", brand: "MediCorp", quantity: 2, price: "₹50" },
    { name: "Ibuprofen", brand: "HealthPlus", quantity: 1, price: "₹70" }
];

function displayMedicineDetails() {
    const detailsContainer = document.getElementById("medicine-details");
    let detailsHTML = "<h5>Medicine Details:</h5><ul>";

    bookedMedicines.forEach(medicine => {
        detailsHTML += `
            <li><strong>Name:</strong> ${medicine.name} <br>
            <strong>Brand:</strong> ${medicine.brand} <br>
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