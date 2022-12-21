let redirectOrderID = "";

$(document).ready(function() {
    console.log("Ready!");
    // The order id should have been passed when we got directed here
    const urlParams = new URLSearchParams(window.location.search);
    const driverID = urlParams.get('driver_id');
    console.log("Driver id is : ", driverID);  
    fetch('https://2w4dq70fjc.execute-api.us-east-1.amazonaws.com/v1/get_pending_orders')
    .then((response) => response.json())
    .then((data) => {
        console.log('Success getting pending orders:', data);
        display(data);
    })
    .catch((error) => {
        console.error('Error getting pending orders:', error);
    });

});

function display(orders){
    let body = "<tbody>";
    let count = 0;
    $("#order_table").empty();
    // adding column titles to table
    $("#order_table").append( "<thead><tr><th scope=\"col\">#</th><th scope=\"col\">Order ID</th><th scope=\"col\">First name</th><th scope=\"col\">Last Name</th><th scope=\"col\">Order name</th><th scope=\"col\">Pickup address</th><th scope=\"col\">Delivery address</th><th scope=\"col\">email</th><th scope=\"col\">Phone</th><th scope=\"col\">Your Decision</th>");
    for (let order of orders){
        count += 1;
        redirectOrderID = order.order_id;
        console.log("redirectOrderID is " + redirectOrderID);
        
        const currButton = "<button onclick=\"redirect()\"; type=\"button\" class=\"btn btn-outline-success\">Accept</button>"
        const orderStr = "<tr><th scope=\"row\">" + count.toString() + "</th><td>" +order.order_id + "</td><td>"+order.first_name + "</td><td>"+order.last_name+"</td><td>"+order.order_name+ "</td><td>" + order.pickup_address + "</td><td>" + order.delivery_address + "</td><td>" + order.email + "</td><td>" + order.phone + "</td><td>" + currButton + "</td></tr>";
        body = body + orderStr;

    }
    // adding the table body.
    $("#order_table").append(body);
}

function redirect(){
    const postBody = {order_id: redirectOrderID, driver_id: driverID};
    fetch('https://2w4dq70fjc.execute-api.us-east-1.amazonaws.com/v1/accept_order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postBody),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success updating status:', data);
        document.location.href = "status.html?order_id="+redirectOrderID+"&driver_id="+driverID;
    })
    .catch((error) => {
        console.error('Error updating status:', error);
    });
}
