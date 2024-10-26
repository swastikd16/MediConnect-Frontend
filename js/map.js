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

async function getShops() {
    const data = {
        request_type: 'get_shops',

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
    console.log(result);
    return result.shops;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance.toFixed(2);
}

async function main() {
    const location = await getLocation();
    const map = L.map('map').setView([location.lat, location.long], 15);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
    }).addTo(map);


    // Creates a red marker with the coffee icon



    const shopList = await getShops();

    shopList.forEach((shop) => {
        const marker = L.marker([shop.location.lat, shop.location.long]).addTo(map)
        const distance = calculateDistance(location.lat, location.long, shop.location.lat, shop.location.long);
        marker.bindPopup(`<b>${shop.name}</b><br>Distance: ${distance} km`).openPopup();

        marker.on('click', function () {
            map.flyTo(marker.getLatLng(), 15, { animate: true, duration: 1 }); // Fly to the marker position with a specific zoom level and duration
            marker.openPopup(); // Open the popup (optional)
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
}
main();