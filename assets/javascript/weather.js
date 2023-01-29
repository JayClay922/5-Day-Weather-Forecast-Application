let apiKey = "0116efa5772e70096506b1a5c5e2d55b"

$("#search-button").on("click", function (event) {
    event.preventDefault();
    let city = $("#search-input").val();
    $.ajax({
        url: "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey,
        method: "GET",
        q: city
    }).then(function (location) {
        let lat = location[0].lat
        let lng = location[0].lon
        console.log(location)

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?" + "lat=" + lat + "&lon=" + lng + "&appid=" + apiKey,
            lat: lat,
            lon: lng,
        }).then(function (weatherResults) {
            console.log(weatherResults)
        })
    });
})



