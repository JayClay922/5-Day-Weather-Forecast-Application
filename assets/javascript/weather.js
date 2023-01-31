//Array of popular locations.
let popularLocations = ["New York", "London", "Paris", "Tokyo"];


//Function for displaying the locations buttons.
function renderButtons() {

    //Deleting popular locations buttons before creating and adding new buttons.
    $("#history").empty();

    //The code is checking if an item in the local storage with the key "popularLocations" exists. If it doesn't exist, it creates the item with the key "popularLocations" and sets its value to a string representation of the data stored in the "popularLocations" variable.
    if(!localStorage.getItem("popularLocations")) {
        localStorage.setItem("popularLocations", JSON.stringify(popularLocations));
    }

    //This retrieves the item from the local storage, parses the string value back into an object and stores it in the "locations" variable.
    let locations = JSON.parse(localStorage.getItem("popularLocations"));


    //Looping through the popularLocations array and creating a button for each element.
    for (i = 0; i < popularLocations.length; i++) {
        let history = $("<button>");
        history.addClass("location-history");
        history.attr("data-name", popularLocations[i]);
        history.text(popularLocations[i]);
        $("#history").append(history)
    }
};


let apiKey = "0116efa5772e70096506b1a5c5e2d55b"


function weatherSearch(city) {
    
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

            //Targetting the ID of today to dislay the current weather information in the DOM.
            $("#today").html(`
            <h2 class="cityName date">${cityName + ", " + "(" + date + ")"} <img id="weatherIcon" src="${iconUrl}" alt="Sky"></h2>
            <p>Temperature: <span id="temperature">${temperature}</span> °C</p>
            <p>Wind Speed:  <span id="windSpeed">${windSpeed}</span> KPH</p>
            <p>Humidity:  <span id="humidity">${humidity}</span>%</p>
            `)

            //The heading's display is set to none, but within this function it has been set to show when this function runs in the event listener.
            $(".forecastHeading").show();

            //This deletes the previous cards, before the results of the next are shown, if not the results will just keep on stacking on top of each other.
            $("#forecast").empty()

            //A for loop to go through the weather results to repeat the following operation 5 times, getting the results and displaying them on the dynamically created cards which are being appended to the forecast ID so that htey can be seen in the DOM.
            for(let i = 0; i < 5; i++) {
                let day = weatherResults.list[i * 8];
                let date = moment(day.dt_txt). format("DD/MM/YYYY");
                let iconCode = day.weather[0].icon;
                let iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
                let temperature = parseFloat((day.main.temp - 273.15).toFixed(1));
                let humidity = day.main.humidity;
                let windSpeed = day.wind.speed;

                //Structure of how the cards display the weather results.
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
};


//Adding event listener for when the button with the ID of 'search-button' is clicked.
$("#search-button").on("click", function (event) {
    event.preventDefault();

    //Getting the value of what the user inputs by targetting the ID of the search input area.
    let city = $("#search-input").val().trim();

    //To add the last location entered in the search input to the top of the list of popular locations
    popularLocations.unshift(city);

    //This setItem stores the values of what the user inputs in the search input part.
    localStorage.setItem("popularLocations", JSON.stringify(popularLocations))
    
    //The renderButtons function is passed through the click event listener so that, it can run.
    renderButtons();

    //The weather search function is also passed through the event listener for the desired operation to run
    weatherSearch(city) 
});


//Another event listener so that when the buttons are clicked the results are also shown.
$("#history").on("click", function (event) {
   
    if(event.target.className !== "location-history") {
        return
    } else {
        let city = event.target.dataset.name

        //This function is passed through this event listener so that when the button is clicked, API calls are made to get the weather conditions of the button clicked.
        weatherSearch(city)
    }
});



function initSearchHistory() {
    var storedHistory = localStorage.getItem('popularLocations');
    if (storedHistory) {
      popularLocations = JSON.parse(storedHistory);
    }
      renderButtons();
  }
  
  initSearchHistory();
  



