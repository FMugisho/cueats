const customer_position = {lat: 40.771209, lng: -73.9673991}; // will use Geolocation.getCurrentPosition()
const intervalMax = 20;
let intervalStart = 0;

// The order id should have been passed when we got directed here
const urlParams = new URLSearchParams(window.location.search)
const order_id = urlParams.get('order_id')
console.log("Order id is : ", order_id)

/*
* Computes the distance between two coordinates
*
* @param { mk1 } marker 1 - represents the first coordinates (latitude and longitude) object
* @param { mk2 } marker 2 - represents the first coordinates (latitude and longitude) object
* @returns haversine distance between the two markers
*/
function haversine_distance(mk1, mk2){
    const R = 3958.8; // Radius of the Earth in miles
    const rlat1 = mk1.lat * (Math.PI/180); // Convert degrees to radians
    const rlat2 = mk2.lat * (Math.PI/180); // Convert degrees to radians
    const difflat = rlat2-rlat1; // Radian difference (latitudes)
    const difflon = (mk2.lng-mk1.lng) * (Math.PI/180); // Radian difference (longitudes)
    const d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
}

function initMap() {
    // The map, centered on Alma Matter Statue
    const center = {lat: 40.80799927514491, lng: -73.96209579429838};
    const options = {zoom: 15, scaleControl: true, center: center};
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(
        document.getElementById('map'), options);

    directionsRenderer.setMap(map);

    const intervalID = setInterval(() => {
        intervalStart++;
        // First, try getting the driver_id for our order
        fetch('https://2w4dq70fjc.execute-api.us-east-1.amazonaws.com/v1/get_order_driver?order_id=' + order_id)
            .then((response) => response.json())
            .then((data) => {
                if (!data.driver_first_name) {
                    return
                }
                console.log("order has been picked up ", data)
                $("#order-status").html("Your order has been picked up by " + data.driver_first_name + " " + data.driver_last_name)

                const driver_id = data.driver_id

                // Now try to get the driver's position
                fetch('https://2w4dq70fjc.execute-api.us-east-1.amazonaws.com/v1/get_driver_location?driver_id=' + driver_id)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Success getting user position:', data);
                        const driver_position = {lat: parseFloat(data.latitude), lng: parseFloat(data.longitude)};
                        // Calculate and display the distance between markers
                        const distance = haversine_distance(driver_position, customer_position);
                        // display distance to driver
                        document.getElementById('msg').innerHTML = "Your driver is: " + distance.toFixed(2) + " miles away.";
                        directionsService
                            .route({
                                origin: driver_position.lat.toString() + "," + driver_position.lng.toString(),
                                destination: customer_position.lat.toString() + "," + customer_position.lng.toString(),
                                travelMode: google.maps.TravelMode.WALKING,
                            })
                            .then((response) => {
                                directionsRenderer.setDirections(response);
                            })
                            .catch((e) => window.alert("Directions request failed due to " + e));
                    })
                    .catch((error) => {
                        console.error('Error getting user position:', error);
                    });
            })
            .catch((error) => {
                console.log("No driver assigned for order yet")
            })

    }, 5000); // update driver's position every 5 second.
    if (intervalStart == intervalMax) {
        clearInterval(intervalID); // Stop the interval
    }
}

window.initMap = initMap;

$( document ).ready(function() {
    console.log( "ready!" );
    $("#order-status").html("The order has not been picked up yet")
});
