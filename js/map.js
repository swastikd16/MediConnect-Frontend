function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    resolve({ latitude, longitude });
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

async function main() {
    const location = await getLocation();
    const map = L.map('map').setView([location.latitude, location.longitude], 15);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
    }).addTo(map);


    // Creates a red marker with the coffee icon



    const shopList = await getShops();

    shopList.forEach((shop) => {
        const marker = L.marker([shop.location.lat, shop.location.long]).addTo(map)
        marker.bindPopup(`<b>${shop.name}</b>`).openPopup();

        marker.on('click', function() {
            map.flyTo(marker.getLatLng(), 15, { animate: true, duration: 1 }); // Fly to the marker position with a specific zoom level and duration
            marker.openPopup(); // Open the popup (optional)
        });
    });

    var redMarker = L.AwesomeMarkers.icon({
        icon: 'home',
        markerColor: 'red'
    });

    L.marker([location.latitude, location.longitude], { icon: redMarker }).addTo(map).bindPopup('You are here').openPopup();
}
main();