let medicineList = [];
let editIndex = -1;

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
            <div class="price">${medicine.price}</div>
            <div class="quantity">${medicine.quantity}</div>
            <div class="actions">
                <i class="fas fa-edit action-icon" onclick="openEditModal(${index})"></i>
                <i class="fas fa-trash-alt action-icon" onclick="deleteMedicine(${index})"></i>
            </div>
        `;
        medicineListElement.appendChild(medicineItem);
    });
}

// Assuming you have already populated the medicine list
document.addEventListener('DOMContentLoaded', () => {
    const medicineItems = document.querySelectorAll('.medicine-item');

    medicineItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove 'clicked' class from all items
            medicineItems.forEach(i => i.classList.remove('clicked'));
            // Add 'clicked' class to the currently clicked item
            item.classList.add('clicked');
        });
    });
});




// Function to add a new medicine
document.getElementById('add-medicine-btn').addEventListener('click', () => {
    const modal = new bootstrap.Modal(document.getElementById('addMedicineModal'));
    modal.show();
});

// Function to submit the medicine form
document.getElementById('submit-medicine-btn').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const brand = document.getElementById('brand').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;

    if (name && brand && price && quantity) {
        const newMedicine = { name, brand, price: parseFloat(price), quantity: parseInt(quantity) };
        medicineList.push(newMedicine);
        updateMedicineList();
        clearForm();
        const modal = bootstrap.Modal.getInstance(document.getElementById('addMedicineModal'));
        modal.hide();
    }
});

// Function to open edit modal
function openEditModal(index) {
    editIndex = index;
    document.getElementById('edit-quantity').value = medicineList[index].quantity;
    const modal = new bootstrap.Modal(document.getElementById('editQuantityModal'));
    modal.show();
}

// Function to update quantity
document.getElementById('update-quantity-btn').addEventListener('click', () => {
    const quantity = parseInt(document.getElementById('edit-quantity').value);
    if (quantity >= 0) {
        medicineList[editIndex].quantity = quantity;
        updateMedicineList();
        const modal = bootstrap.Modal.getInstance(document.getElementById('editQuantityModal'));
        modal.hide();
    }
});

// Function to delete a medicine
function deleteMedicine(index) {
    medicineList.splice(index, 1);
    updateMedicineList();
}

// Function to clear the form
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('brand').value = '';
    document.getElementById('price').value = '';
    document.getElementById('quantity').value = '';
}
