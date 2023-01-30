//Array of popular locations.
let popularLocations = ["New York", "London", "Paris", "Tokyo"];

//Function for displaying the locations buttons
function renderButtons() {
    for (i = 0; i < popularLocations.length; i++) {
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

    //To push last location entered in the search input to the list of popular locations till browser is refreshed.
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
            let cityName = weatherResults.city.name;
            let date = moment(weatherResults.list[0].dt_txt).format("DD/MM/YYYY");
            let iconCode = weatherResults.list[0].weather[0].icon;
            let iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
            let temperature = parseFloat((weatherResults.list[0].main.temp - 273.15).toFixed(1));
            let humidity = weatherResults.list[0].main.humidity;
            let windSpeed = weatherResults.list[0].wind.speed;

            
            $("#today").html(`
            <h2 class="cityName date">${cityName + ", " + "(" + date + ")"} <img id="weatherIcon" src="${iconUrl}" alt="Sky"></h2>
            <p>Temperature: <span id="temperature">${temperature}</span> °C</p>
            <p>Wind Speed:  <span id="windSpeed">${windSpeed}</span> KPH</p>
            <p>Humidity:  <span id="humidity">${humidity}</span>%</p>
            `)

            

            for(let i = 0; i < 5; i++) {
                let day = weatherResults.list[i * 8];
                let date = moment(day.dt_txt). format("DD/MM/YYYY");
                let iconCode = day.weather[0].icon;
                let iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
                let temperature = parseFloat((day.main.temp - 273.15).toFixed(1));
                let humidity = day.main.humidity;
                let windSpeed = day.wind.speed;

                let cardHTML = `
                <div class="card">
                  <div class="cardHeader">
                    <h5>${date}</h5>
                  </div>
                  <div class="cardBody">
                    <img src="${iconUrl}" alt="Weather Icon">
                    <p>Temperature: ${temperature} °C</p>
                    <p>Wind Speed: ${windSpeed} KPH</P>
                    <p>Humidity: ${humidity}%</p>
                  </div>
                </div>
                `;

                $("#forecast").append(cardHTML);
            }
        })
    });
})

renderButtons();



