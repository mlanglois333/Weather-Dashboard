
var now = moment().format('MMMM Do, h:mm');
var city = "";
let lon = "";
let lat = "";

function clickBut() {
  console.log('clicked');
}

function cityBut() {

  var newBut = $('<input/>').attr({ type: 'button', text: city, value: city });;
  newBut.attr('class', 'cityBut');

  $('#searchCont').append(newBut);



}

function searchCity() {

  var citySearch = $("#searchVal").val();
  city = citySearch.trim();


  getLat();
  cityBut();
}


function getLat() {

  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=516035025459d10bbc10ed362c69ce7b";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      console.log(response);
      var weathImg = "'http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png'"
      $("#cityTitle").html(response.name + " " + now + "<img src=" + weathImg + ">");


      lat = response.coord.lat;

      lon = response.coord.lon;
      renderWeather();

    });
}



function renderWeather() {
  var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=516035025459d10bbc10ed362c69ce7b";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {

      console.log(response);

      if (response.current.uvi < 3.1) {
        $("#UV").html("UV Index: <span class='green'>" + response.current.uvi + "</span>");
        ;
      }
      else if (response.current.uvi < 6.1) {
        $("#UV").html("UV Index: <span class='yellow'>" + response.current.uvi + "</span>");
      }
      else {
        $("#UV").html("UV Index: <span class='red'>" + response.current.uvi + "</span>");
        ;
      };
      $("#windSpeed").text("Wind Speed: " + response.current.wind_speed);
      $("#humidity").text("Humidity: " + response.current.humidity);
      var tempF = (response.current.temp - 273.15) * 1.80 + 32;
      $("#temperature").text("Temperature " + tempF.toFixed(2));




      for (i = 0; i <= 5; i++) {
        var weathImg = "'http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png'"
        var tempF = (response.daily[i].temp.day - 273.15) * 1.80 + 32;
        var day = moment().add(i, 'day').format('dddd');
        $("#day" + i).html(day + "<br> <img src=" + weathImg + "> <br> Temp: " + tempF.toFixed(2) + " <br> Humidity: " + response.daily[i].humidity);


      }
    });

}




document.getElementById("searchBut").addEventListener("click", function (event) { event.preventDefault() });
document.getElementById("searchBut").addEventListener("click", function () { searchCity() });

