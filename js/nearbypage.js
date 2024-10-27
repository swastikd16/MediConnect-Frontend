

async function getShops() {
    const searchParams = new URLSearchParams(window.location.search);
    const medicine_name = searchParams.get('medicine_name');

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

    shopList.forEach((shop) => {
        pos++

        // Add a marker to the map
        const marker = L.marker([shop.shop_location.lat, shop.shop_location.long]).addTo(map)
        marker.bindPopup(`<b>${shop.shop_name}</b><br>Distance: ${shop.distance} km`).openPopup();

        marker.on('click', function () {
            map.flyTo(marker.getLatLng(), 15, { animate: true, duration: 1 }); // Fly to the marker position with a specific zoom level and duration
            marker.openPopup(); // Open the popup (optional)
        });

        // Add data to the table

        document.getElementById('shop-body').innerHTML += `<tr>
                        <td>${shop.shop_name}</td>
                        <td>${shop.distance} km</td>
                        <td>${shop.price}</td>
                        <td class="actions">
                            <a id="viewmap${pos}" title="View on Map"><i class="fas fa-eye"></i></a>
                            <a id="buymed${pos}" title="Buy Now"><i class="fas fa-shopping-cart"></i></a>
                        </td>
                    </tr>`

        document.getElementById(`viewmap${pos}`).addEventListener('click', function () {
            map.flyTo(marker.getLatLng(), 15, { animate: true, duration: 1 }); // Fly to the marker position with a specific zoom level and duration
            marker.openPopup(); // Open the popup (optional)
        })

        document.getElementById(`buymed${pos}`).addEventListener('click', function () {
            console.log('Buy Now')
        })

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