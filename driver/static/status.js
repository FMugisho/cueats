$(document).ready(function() {
    console.log( "ready!" );
    $("#key1").click(function() {
        // TODO FMugisho: add class big dot to span on click
        alert("key 1 clicked");
        const today = new Date();
        // TODO FMugisho: add class big dot to span on click
        $("#key1").addClass("big dot"); // marking the current status
        $("#val1").text(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() +' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()); // assign datetime as status text
        $("#val1-2").val("Order received");
    });
    $("#key2").click(function() {
        // do something
        alert("key 2 clicked");
        const today = new Date();
        // TODO FMugisho: add class big dot to span on click
        $("#key2").addClass("big dot"); // marking the current status
        $("#val2").text(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() +' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()); // assign datetime as status text
        $("#val2-2").val("Accepted order");

    }); 
    $("#key3").click(function() {
        // do something
        alert("key 3 clicked");
        const today = new Date();
        // TODO FMugisho: add class big dot to span on click
        $("#key3").addClass("big dot"); // marking the current status
        $("#val3").text(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() +' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()); // assign datetime as status text
        $("#val3-2").val("Order picked up from vendor");

    }); 
    $("#key4").click(function() {
        // do something
        alert("key 4 clicked");
        const today = new Date();
        // TODO FMugisho: add class big dot to span on click
        $("#key4").addClass("big dot"); // marking the current status
        $("#val4").text(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() +' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()); // assign datetime as status text
        $("#val4-2").val("Order out for delivery");

    });
    $("#key5").click(function() {
        // do something
        alert("key 5 clicked");
        const today = new Date();
        // TODO FMugisho: add class big dot to span on click
        $("#key5").addClass("big dot"); // marking the current status
        $("#val5").text(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() +' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()); // assign datetime as status text
        $("#val5-2").val("Delivered");

    });
});