
const apigClient = apigClientFactory.newClient()

var i = 0
const images = [
    "https://cu-eats-client-front-end.s3.amazonaws.com/static-photos/Roaree-73v2.jpg",
    "https://cu-eats-client-front-end.s3.amazonaws.com/static-photos/Campus-dining.jpg",
    "https://cu-eats-client-front-end.s3.amazonaws.com/static-photos/columbia-jj-thumb-3.jpg"
]

function make_location_card(image_src, title_text, description_text) {
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

function make_item_card(menu_item) {
    const card = $("<div class='col-sm-3 card'>")
    const img = $("<img class='card-img-top'>")
    img.attr("src", menu_item.image_url)
    const card_body = $("<div class='card-body'>")
    const title = $("<h5 class='card-title'>")
    title.html(menu_item.name)
    const card_description = $("<p class='card-text' style='text-align: center'>")
    card_description.html(menu_item.description)
    const add_to_cart_btn = $("<a href='#' class='btn btn-outline-primary btn-rounded cartbutton' data-mdb-ripple-color='dark'>")
    add_to_cart_btn.html("Add to cart")

    // TODO add the right function for adding to cart

    card_body.append(title, $("<hr class='my-4'>"), card_description, add_to_cart_btn)

    card.append(img, card_body)

    return card
}

$(document).ready(function () {
    console.log("home.js loaded")

    const result = apigClient.getMenuGet().then(function (result) {
        console.log(result.data)
        $.each(result.data, function (location_id, cur_location) {
            let cur_location_card = make_location_card(
                images[i++ % images.length], // TODO: use real image
                cur_location.location_name,
                cur_location.location_name
            )
            $("#locations-container").append(cur_location_card)

            // When the card is clicked, we show the menu for that location
            cur_location_card.click(function () {
                const items_container = $("#items-container")
                items_container.empty()

                $.each(cur_location.location_details, function (cur_meal, stations) {
                    // TODO: show the meal (like breakfast, lunch etc...)
                    // const meal_description = $("<div class='col-sm-12>'")
                    // meal_description.html(cur_meal)
                    // items_container.append(meal_description)
                    // items_container.append("<br>")

                    $.each(stations, function (cur_station, menu_items) {
                        // TODO: Show the station (like main line, grill etc.)
                        // const station_description = $("<h3>")
                        // station_description.html(cur_station)
                        // items_container.append(station_description)
                        // items_container.append("<br>")

                        $.each(menu_items, function (j, cur_menu_item) {
                            const menu_item = {
                                "image_url" : "image_url", // TODO
                                "name" : cur_menu_item,
                                "description" : "Delicious food cooked to perfection" // TODO
                            }
                            $("#items-container").append(make_item_card(menu_item))
                        })
                    })
                })
            })
        })
    }).catch(function (result) {
        console.log(result)
    })



    console.log("results: ", result)


})
