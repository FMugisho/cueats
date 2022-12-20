// Initialize and add the map
let map;
const driver_id = '1579';
const customer_position = {lat: 40.771209, lng: -73.9673991};
function haversine_distance(mk1, mk2){
    const R = 3958.8; // Radius of the Earth in miles
    const rlat1 = mk1.position.lat() * (Math.PI/180); // Convert degrees to radians
    const rlat2 = mk2.position.lat() * (Math.PI/180); // Convert degrees to radians
    const difflat = rlat2-rlat1; // Radian difference (latitudes)
    const difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)

    const d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
}

function initMap() {
    // 40.80949053197731, -73.96179619951633 - Columbia Gym
    // The map, centered on Central Park
    const center = {lat: 40.774102, lng: -73.971734};
    const options = {zoom: 15, scaleControl: true, center: center};
    map = new google.maps.Map(
        document.getElementById('map'), options);

    fetch('https://2w4dq70fjc.execute-api.us-east-1.amazonaws.com/v1/get_driver_location?driver_id=' + driver_id)
    .then((response) => response.json())
    .then((data) => {
        console.log('Success getting user position:', data);
        const driver_position = {lat: parseFloat(data.latitude), lng: parseFloat(data.longitude)};
        // The markers for The driver's and The customer's locations
        const mk1 = new google.maps.Marker({position: driver_position, map: map});
        const mk2 = new google.maps.Marker({position: customer_position, map: map});
        // Draw a line showing the straight distance between the markers
        const line = new google.maps.Polyline({path: [driver_position, customer_position], map: map});
        // Calculate and display the distance between markers
        const distance = haversine_distance(mk1, mk2);
        document.getElementById('msg').innerHTML = "Distance between markers: " + distance.toFixed(2) + " mi.";
    })
    .catch((error) => {
        console.error('Error getting user position:', error);
    });
}

$( document ).ready(function() {
    console.log( "ready!" );
});