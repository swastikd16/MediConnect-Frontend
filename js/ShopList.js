async function getMedicineList() {
    const data = {
        request_type: 'get_med',
        email: localStorage.getItem('email'),
    };

    const response = await fetch('http://127.0.0.1:8000/api/medicine', {
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
            return result.medicine;
        }
        else {
            alert(`Failed to get data: ${result.message}`);
        }
    } else {
        alert(`Failed to get data: ${result.message}`);
    }

}

let editIndex = -1;
let medicineList = [];

const medicineListElement = document.getElementById('medicine-list');
const loaderElement = document.getElementById('loader');

// Function to update the medicine list display
function updateMedicineList() {
    medicineListElement.innerHTML = ''; // Clear current list
    medicineList.forEach((medicine, index) => {
        const medicineItem = document.createElement('li');
        medicineItem.className = 'medicine-item';
        medicineItem.innerHTML = `
            <div class="serial-number">${index + 1}</div>
            <div class="name">${medicine.name}</div>
            <div class="brand">${medicine.brand}</div>
            <div class="quantity">${medicine.quantity}</div>
            <div class="price">${medicine.price}</div>
            <div class="actions">
                <i class="fas fa-edit action-icon" onclick="openEditModal(${index})"></i>
                <i class="fas fa-trash-alt action-icon" onclick="deleteMedicine(${index})"></i>
            </div>
        `;
        medicineListElement.appendChild(medicineItem);
    });

    document.getElementById('loader').style.display = 'none';
}

// Assuming you have already populated the medicine list
document.addEventListener('DOMContentLoaded', () => {

    getMedicineList().then(m => {
        medicineList = m
        console.log(medicineList);
        updateMedicineList(medicineList);

    });
});




// Function to add a new medicine
document.getElementById('add-medicine-btn').addEventListener('click', () => {
    const modal = new bootstrap.Modal(document.getElementById('addMedicineModal'));
    modal.show();
});

function generateRandomNumber() {
    return Math.floor(10000 + Math.random() * 90000);
}

async function addMedicine(m) {
    const data = {
        "request_type": "add_med",
        "email": localStorage.getItem('email'),
        "Med_data": {
            "id": generateRandomNumber(),
            "name": m[0],
            "brand": m[1],
            "price": m[2],
            "quantity": m[3],
        },
    };

    const response = await fetch('http://127.0.0.1:8000/api/medicine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);

};

// Function to submit the medicine form
document.getElementById('submit-medicine-btn').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const brand = document.getElementById('brand').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;

    if (name && brand && price && quantity) {
        const newMedicine = { name, brand, quantity: parseInt(quantity), price: parseFloat(price) };
        medicineList.push(newMedicine);
        updateMedicineList();
        const modal = bootstrap.Modal.getInstance(document.getElementById('addMedicineModal'));
        modal.hide();

        addMedicine([name, brand, quantity, price]);
    }
});
