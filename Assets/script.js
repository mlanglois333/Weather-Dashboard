
var now= moment().format('MMMM Do, h:mm');
var city="";
var lat="";
var lon="";
var APIKey = "166a433c57516f51dfab1f7edaed8413";
var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

renderWeather(){
$.ajax({
  url: queryURL,
  method: "GET"
})
  .then(function(response) {

    console.log(response);

    $("#cityTitle").html(response.name + " " + now);
    $("#windSpeed").text("Wind Speed: " + response.wind.speed);
    $("#humidity").text("Humidity: " + response.main.humidity);
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    $("#temperature").text("Temperature " + tempF.toFixed(2));
    $("#UV").text("UV Index: " + response.main.humidity);
  });
}