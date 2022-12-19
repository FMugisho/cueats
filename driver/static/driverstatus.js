$(document).ready(function() {
    console.log( "ready!" );
    $("key1").on("click", function(){
        console.log("clicked")
    })
    $("key1").click(function() {
        // do something
        console.log("it's been clicked");
        alert(foo);
        const today = new Date();
        const dateTime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() +' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        $("#key1").addClass("big dot"); // marking the current status
    });
    $("#key2").click(function() {
        // do something
        const today = new Date();
        const dateTime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() +' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        $("#key2").addClass("big dot"); // marking the current status

    }); 
    $("#key3").click(function() {
        // do something
        const today = new Date();
        const dateTime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() +' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        $("#key3").addClass("big dot"); // marking the current status

    }); 
    $("#key4").click(function() {
        // do something
        const today = new Date();
        const dateTime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() +' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        $("#key4").addClass("big dot"); // marking the current status

    });
});