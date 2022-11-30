window.onload = function(){
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    populateCart(params);
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
    }, false);
}

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
