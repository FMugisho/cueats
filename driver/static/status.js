// const driverID = '1579';
const clientName = "PrezBo";
let watchId;
 
$(document).ready(function() {
    console.log( "ready!" );
    // The order id should have been passed when we got directed here
    const urlParams = new URLSearchParams(window.location.search)
    const driverID = urlParams.get('driver_id');
    const orderID = urlParams.get('order_id');
    const orderDetails = urlParams.get('order_details');
    console.log("Driver id is : ", driverID);
    // to Foo Bar on December 18th, 2022
    $("#clientinfo").text(orderDetails + " on " +  new Date().toLocaleDateString());
    $("#key1").click(function() {
        // TODO FMugisho: add class big dot to span on click
        // Order received --- do something
        // TODO FMugisho: add class big dot to span on click
        $("#key1").addClass("big dot"); // marking the current status
        $("#val1").text(new Date().toLocaleTimeString()); // assign datetime as status text

        // send position because we have received the order
        watchId = navigator.geolocation.watchPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
          
            // Send the updated latitude and longitude to customers using API gateway endpoint
            // console.log("latitute")
            // TODO: Update driver's id
            const data = { 'driver_id': driverID, 'latitude': latitude, 'longitude': longitude};

            fetch('https://2w4dq70fjc.execute-api.us-east-1.amazonaws.com/v1/update_driver_location', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success while sending position:', data);
            })
            .catch((error) => {
                console.error('Error sending position:', error);
            });
        });
          
    });
    $("#key2").click(function() {
        // Accepted order --- do something
        // TODO FMugisho: add class big dot to span on click
        $("#key2").addClass("big dot"); // marking the current status
        $("#val2").text(new Date().toLocaleTimeString()); // assign datetime as status text
        $("#val2-2").val("Accepted order");

    }); 
    $("#key3").click(function() {
        // Order picked up from vendor --- do something
        // TODO FMugisho: add class big dot to span on click
        $("#key3").addClass("big dot"); // marking the current status
        $("#val3").text(new Date().toLocaleTimeString()); // assign datetime as status text

        const postBody = {order_id: orderID};
        fetch('https://2w4dq70fjc.execute-api.us-east-1.amazonaws.com/v1/pick_up_order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postBody),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success updating status for pickup order:', data);
        })
        .catch((error) => {
            console.error('Error updating status for pickup order:', error);
        });
    }); 
    $("#key4").click(function() {
        // Order out for delivery --- do something
        // TODO FMugisho: add class big dot to span on click
        $("#key4").addClass("big dot"); // marking the current status
        $("#val4").text(new Date().toLocaleTimeString()); // assign datetime as status text

    });
    $("#key5").click(function() {
        // Delivered --- do something
        // TODO FMugisho: add class big dot to span on click
        $("#key5").addClass("big dot"); // marking the current status
        $("#val5").text(new Date().toLocaleTimeString()); // assign datetime as status text
        navigator.geolocation.clearWatch(watchId); // stop tracking driver's position
        console.log("we're done tracking your position");
        const postBody = {order_id: orderID};
        fetch('https://2w4dq70fjc.execute-api.us-east-1.amazonaws.com/v1/finish_order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postBody),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success updating status for finish order:', data);
            document.location.href = "list_order.html";  // we're done and can go back to see other orders
        })
        .catch((error) => {
            console.error('Error updating status for finish order:', error);
        });

    });
});