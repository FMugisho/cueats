const apigClient = apigClientFactory.newClient({apiKey: "DBRcedm5J4a8k4wxtwcEJ3vltGN7knEU8GLHOnLn"});
const access_token = Cookies.get('access_token')
$(document).ready(function(){
  const urlSearchParams = new URLSearchParams(window.location.search);
  const orderDetails = Object.fromEntries(urlSearchParams.entries());
  console.log("the order details params are " + JSON.stringify(orderDetails));
  populateCart(orderDetails);

  $("#placeorder").click(function(){
    console.log("the final place order button has been clicked ... ");
    const formResponse = parseForm();
    const params = {
      "Content-Type": "application/json",
    };
    const body = {
      "messages": [
        {
          "type": "",
          "unstructured": {
            "order_name": JSON.stringify(orderDetails),
            "order_price": "15",
            "user_email": formResponse[0],
            "location": "CU Dining", // TODO FMugisho: Parse real location
            "details": formResponse[1],
            "timestamp": "",
            "access_token": access_token
          }
        }
      ]
    };
    const additionalParams = {
      headers: {
        "Content-Type": "application/json"
      },
    };
    const result = apigClient.placeOrderPost(params, body, additionalParams).then(function(result){
        console.log("here is the result from the post request: ", result);

        window.location.href = "delivery.html?order_id=" + result.data.order_id

    }).catch(function (result) {
      console.log("in the exception block!");
      console.log(result);
    });

  });
})

function populateCart(items){
    const totalPrice = 15; // assume customers will be billed by the average money value of a swipe.
    const discount = 0; // TODO: adjust discount value if applicable.
    let itemCount = 0;
    for (const [key, value] of Object.entries(items)){
        itemCount += 1;
        $("#cart-items").append("<li class=\"list-group-item d-flex justify-content-between lh-condensed\"><div><h6 class=\"my-0\">" + key + "</h6>" + "<small class=\"text-muted\">Lorem Ipsum</small></div> <span class=\"text-muted\">Qty: " + value + "</span> </li>");
    }
    $("#cart-count").append(itemCount);
    $("#cart-items").append("<li class=\"list-group-item d-flex justify-content-between bg-light\"><div><h6 class=\"my-0\">" + "Promo code" + "</h6>" + "<small class=\"text-muted\">TBD</small></div> <span class=\"text-success\">" + discount + "</span> </li>");
    $("#cart-items").append("<li class=\"list-group-item d-flex justify-content-between\"><span>Total (USD)</span> <strong> $" + (totalPrice - discount) + "</strong> </li>");
}

function parseForm(){
  const details = {
    "username": $("#username").val,
    "firstname": $("#firstName").val,
    "lastname": $("#lastName").val,
    "address": $("#address").val(),
  }
  const emailAddr = $("#email").val();
  // TODO FMugisho: parse other element like name, address, etc
  return [emailAddr, JSON.stringify(details)];
}
