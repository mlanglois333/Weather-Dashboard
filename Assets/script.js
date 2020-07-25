
var now= moment().format('MMMM Do, h:mm');
var city="";
let lon="";
let lat="";


function cityBut(){

  var newBut = $("<button>");
  newBut.attr('id', 'cityBut');
  newBut.text(city);
  newBut.attr('data-city', city);
  $("#searchCont").append(newBut);



}

function searchCity(){

    var citySearch= $("#searchVal").val();
    city= citySearch.trim();

    
    getLat();
    cityBut();
}


function getLat(){

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=516035025459d10bbc10ed362c69ce7b";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        console.log(response);
$("#cityTitle").html(response.name + " " + now);


        lat=response.coord.lat;

        lon=response.coord.lon;
        renderWeather();

});}



function renderWeather(){
var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=516035025459d10bbc10ed362c69ce7b";

$.ajax({
  url: queryURL,
  method: "GET"
})
  .then(function(response) {

    console.log(response);

    
    $("#windSpeed").text("Wind Speed: " + response.current.wind_speed);
    $("#humidity").text("Humidity: " + response.current.humidity);
    var tempF = (response.current.temp - 273.15) * 1.80 + 32;
    $("#temperature").text("Temperature " + tempF.toFixed(2));
    $("#UV").text("UV Index: " + response.current.uvi);


    for (i=0;i<=5; i++){

      var tempF = (response.daily[i].temp.day - 273.15) * 1.80 + 32;
     
      $("#day" + i).text("Temp: " + tempF.toFixed(2)+ "Humidity: " + response.daily[i].humidity);
      
      
    }
});

}
 



document.getElementById("searchBut").addEventListener("click", function(event) {event.preventDefault()});