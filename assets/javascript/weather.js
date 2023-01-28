// $("#search-input").on("click", function (event) {
//     let weatherAPI = "0116efa5772e70096506b1a5c5e2d55b"
//     let queryURL = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=0116efa5772e70096506b1a5c5e2d55b"

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         console.log(queryURL)
//     });
// });

$("#search-button").on("click", function() {
    let city = $("#search-input").val();
    $.ajax({
        url: "http://api.openweathermap.org/geo/1.0/direct",
        method: "GET",
        data: {
           key: "0116efa5772e70096506b1a5c5e2d55b",
           q: city
        },
        success: function(location) {
            let lat = location.results[0].geometry.lat;
            let lng = location.results[0].geometry.lat;

            $.ajax({
                url: "api.openweathermap.org/data/2.5/forecast",
                method: "GET",
                data: {
                    lat: lat,
                    lon: lng,
                    appid: "0116efa5772e70096506b1a5c5e2d55b"
                },
                success: function(weather) {
                    
                }
            })
        }
        
        })

    })
})




