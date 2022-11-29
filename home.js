
const apigClient = apigClientFactory.newClient()

var i = 0
const images = [
    "https://cu-eats-client-front-end.s3.amazonaws.com/static-photos/Roaree-73v2.jpg",
    "https://cu-eats-client-front-end.s3.amazonaws.com/static-photos/Campus-dining.jpg",
    "https://cu-eats-client-front-end.s3.amazonaws.com/static-photos/columbia-jj-thumb-3.jpg"
]

function make_card(image_src, title_text, description_text) {
    const card = $("<div class='col-sm card'>")
    const img = $("<img>")
    img.attr('src', image_src)
    const body = $("<div class='card-body'>")
    const title = $("<h5 class='card-title'>")
    title.html(title_text)
    body.append(title)
    body.append($("<hr class='my-4'>"))
    const description = $("<p class='card-text' style='text-align:center'>")
    description.html(description_text)
    body.append(description)

    card.append(img, body)

    return card
}

$(document).ready(function (){
    console.log("home.js loaded")

    const result = apigClient.getMenuGet().then(function (result) {
        console.log(result.data)
        $.each(result.data, function (i, val) {
            $("#locations-container").append(make_card(images[i++ % images.length], val.location_name, val.location_name))
        })
    }).catch(function (result) {
        console.log(result)
    })



    console.log("results: ", result)



    $("#locations-container").append(make_card("hello", "hi there", "nein"))

})
