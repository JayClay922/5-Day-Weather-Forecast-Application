$("#search-input")
let weatherAPI = "0116efa5772e70096506b1a5c5e2d55b"
let queryURL = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={0116efa5772e70096506b1a5c5e2d55b}"

$.ajax({
  url: queryURL,
  method: "GET"
}) .then(function(response) {
  console.log(queryURL)
});



