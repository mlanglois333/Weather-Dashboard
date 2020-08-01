
var now = moment().format('MMMM Do, h:mm');
var city = "";
let lon = "";
let lat = "";



function searchCity() {

  var citySearch = $("#searchVal").val();
  city = citySearch.trim();


  getLat();

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
    if(localStorage.getItem('lastSearch') === null){
    localStorage.setItem('lastSearch', city);
    }
    else {localStorage.clear('lastSearch');
    localStorage.setItem('lastSearch', city);

  }
  console.log(localStorage.getItem('lastSearch'));

  cityBut();

}


function cityBut() {
  if ($("#" + city).length == 0) {

    var cityAssign = city
    var cityBtn = $("<button>");
    cityBtn.text(city);
    cityBtn.attr('id', city)
    cityBtn.on('click', function () { city = cityAssign });
    cityBtn.on('click', function () { getLat() });
    $('#searchCont').append(cityBtn);
  }
  else { return };



}

function load() { if (localStorage.getItem('lastSearch') === null)
{return}
else {city=localStorage.getItem('lastSearch');
getLat();}
}

document.getElementById("searchBut").addEventListener("click", function (event) { event.preventDefault() });
document.getElementById("searchBut").addEventListener("click", function () { searchCity() });
document.getElementById("searchBut").addEventListener("click", function (event) { event.stopPropagation });
load();
console.log(localStorage.getItem('lastSearch'));