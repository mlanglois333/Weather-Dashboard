
var now= moment().format('MMMM Do, h:mm');
var city="";



function searchCity(){

    var citySearch= $("#searchVal").val();
    city= citySearch.trim();
    renderWeather()
}

function renderWeather(){
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=516035025459d10bbc10ed362c69ce7b";

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
    $("#UV").text("UV Index: " + response.main.UVindex);
  });
}

document.getElementById("searchBut").addEventListener("click", function(event) {event.preventDefault()});