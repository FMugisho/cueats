const orders = {"philly cheesesteak":5, "chef mike grandma's special": 14, "ferris special pasta": 15, "chef Debi's injara": 100};

window.onload = function(){
    populateCart();
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

function populateCart(){
    let totalPrice = 0;
    let itemCount = 0;
    for (const [key, value] of Object.entries(orders)){
        itemCount += 1;
        totalPrice += value
        $("#cart-items").append("<li class=\"list-group-item d-flex justify-content-between lh-condensed\"><div><h6 class=\"my-0\">" + key + "</h6>" + "<small class=\"text-muted\">Lorem Ipsum</small></div> <span class=\"text-muted\">$" + value + "</span> </li>");
    }
    $("#cart-count").append(itemCount);
    $("#cart-items").append("<li class=\"list-group-item d-flex justify-content-between bg-light\"><div><h6 class=\"my-0\">" + "Promo code" + "</h6>" + "<small class=\"text-muted\">TBD</small></div> <span class=\"text-success\">-0</span> </li>");
    $("#cart-items").append("<li class=\"list-group-item d-flex justify-content-between\"><span>Total (USD)</span> <strong> $" + totalPrice + "</strong> </li>");
}
