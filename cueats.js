const apiKey = "DBRcedm5J4a8k4wxtwcEJ3vltGN7knEU8GLHOnLn";
const apiEndPoint = "https://2w4dq70fjc.execute-api.us-east-1.amazonaws.com/v1";

window.onload = function(){
    $("#search_order").click(function(){
        // Search button has been clicked. Do something!
        const searchItem = $("#q").val();
        console.log(searchItem);
        $("#q").val(''); // clearing up the search bar.
        $("#q").focus(); // focus cursor on the search bar.

        const apigClient = apigClientFactory.newClient({
            apiKey: apiKey
        });
        const params = {
            "q": input
        };
        const body = {};
        const additionalParams = {
            headers:{},
            queryParams: {}
        };

        apigClient.searchGet(params, body, additionalParams)
        .then(function(result) {
            // TODO:    `FMugisho implement
            // Some result found. Do something

        }).catch(function(result) {
            // TODO:    `FMugisho implement
            // Some exception occurred. Handle here
        });
    })
}