let apiKey = "0116efa5772e70096506b1a5c5e2d55b"

$("#search-button").on("click", function (event) {
    event.preventDefault();
    let city = $("#search-input").val();
    $.ajax({
        url: "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey,
        method: "GET",
        q: city
    }).then(function (location) {
        let lat = location.results[0].geometry.lat;
        let lng = location.results[0].geometry.lng;

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?" + "lat=" + lat + "&lon=" + lng + "&appid=" + apiKey,
            lat: lat,
            lon: lng,
        }).then(function (weather) {
            console.log(weather)
        })
    });
})



