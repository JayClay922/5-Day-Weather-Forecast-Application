let popularLocations = ["New York", "London", "Paris", "Tokyo"];

function renderButtons() {
    for(i = 0; i < popularLocations.length; i++) {
       let history = $("<button>");
       history.addClass("locationHistory");
       history.attr("data-name", popularLocations[i]);
       history.text(popularLocations[i]);
       $("#sideBar").append(history)
    }
};






let apiKey = "0116efa5772e70096506b1a5c5e2d55b"

//Adding event listener for when the button with the ID of 'search-button' is clicked.
$("#search-button").on("click", function (event) {
    event.preventDefault();
    
    //Getting the value of what the user inputs by targetting the ID of the search input area.
    let city = $("#search-input").val().trim();

    popularLocations.push(city);
    renderButtons();

    //Using AJAX to make an API call requesting longitude and latitude of the location inputted by the user.
    $.ajax({
        url: "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey,
        method: "GET",
        q: city
    }).then(function (location) {
        let lat = location[0].lat
        let lng = location[0].lon
        

        //Another API call requesting weather information of the location with the longitude and latitude retrieved by first API call.
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?" + "lat=" + lat + "&lon=" + lng + "&appid=" + apiKey,
            lat: lat,
            lon: lng,
        }).then(function (weatherResults) {
            
        })
    });
})

renderButtons();



