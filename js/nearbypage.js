

async function getShops() {
    const searchParams = new URLSearchParams(window.location.search);
    const medicine_name = searchParams.get('medicine_name');

    document.getElementById('med-name').innerHTML = `Medicine Name: ${medicine_name}`;

    const location = await getLocation();
    const data = {
        request_type: 'get_shops',
        user_location: location,
        medicine_name: medicine_name,

    };

    // Sending POST request to backend
    const response = await fetch('http://127.0.0.1:8000/api/shops', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
    return result.shops;
}

document.addEventListener('DOMContentLoaded', async function () {
    const shopList = await getShops();
    const location = await getLocation();
    const map = L.map('map').setView([location.lat, location.long], 15);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
    }).addTo(map);

    let pos = 0

    shopList.forEach((shop, index) => {
        // Increment position
        pos++;

        // Add a marker to the map
        const marker = L.marker([shop.shop_location.lat, shop.shop_location.long]).addTo(map);
        marker.bindPopup(`<b>${shop.shop_name}</b><br>Distance: ${shop.distance} km`).openPopup();

        marker.on('click', function () {
            map.flyTo(marker.getLatLng(), 15, { animate: true, duration: 1 });
            marker.openPopup();
        });

        // Add data to the table
        const tableBody = document.getElementById('shop-body');
        const newRow = tableBody.insertRow();

        // Shop name
        const nameCell = newRow.insertCell(0);
        nameCell.textContent = shop.shop_name;

        // Distance
        const distanceCell = newRow.insertCell(1);
        distanceCell.textContent = `${shop.distance} km`;

        // Price
        const priceCell = newRow.insertCell(2);
        priceCell.textContent = shop.price;

        // Actions with View on Map and Buy Now buttons
        const actionsCell = newRow.insertCell(3);
        actionsCell.className = 'actions';

        const viewLink = document.createElement('a');
        viewLink.id = `viewmap${pos}`;
        viewLink.title = "View on Map";
        viewLink.innerHTML = '<i class="fas fa-eye"></i>';
        actionsCell.appendChild(viewLink);

        const buyLink = document.createElement('a');
        buyLink.id = `buymed${pos}`;
        buyLink.title = "Buy Now";
        buyLink.innerHTML = '<i class="fas fa-shopping-cart"></i>';
        actionsCell.appendChild(buyLink);

        // Event listeners
        viewLink.addEventListener('click', function () {
            map.flyTo(marker.getLatLng(), 15, { animate: true, duration: 1 });
            marker.openPopup();
        });

        buyLink.addEventListener('click', function () {
            console.log('Buy Now');
        });
    });


    var redMarker = L.AwesomeMarkers.icon({
        icon: 'home',
        markerColor: 'red'
    });

    const marker = L.marker([location.lat, location.long], { icon: redMarker })
    marker.addTo(map).bindPopup('You are here').openPopup();
    marker.on('click', function () {
        map.flyTo(marker.getLatLng(), 15, { animate: true, duration: 1 }); // Fly to the marker position with a specific zoom level and duration
        marker.openPopup(); // Open the popup (optional)

    });
});