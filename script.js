//localStorage.clear;
// Variables created
var APIkey = '558872b4719f78b0116470aa2fdbdd69'
var searchbox = document.querySelector("#search-box");
var citysearch = document.querySelector("#city");
var currentweather = document.querySelector("#heading");
var currentdata = document.querySelector("#current-data");
var clearbtn = document.querySelector("#clear-btn");
var searchpanel = document.querySelector("#search-panel");
var error = document.querySelector("#error-box");
var temp = document.querySelector("#temp");
var humid = document.querySelector("#humid");
var uvi = document.querySelector("#uvi");
var weathericon = document.querySelector("#weather-icon");
var currenticon = document.querySelector("#current-icon");
var wind = document.querySelector("#wind");
    
var search = JSON.parse(localStorage.getItem("search") || "[]");
//Search city
var formSumbit = function (event){
    event.preventDefault();
    var city = titleCase ($("#city")[0].value.trim());
    citysearchEl.value = ""
//Error message if city name not entered
        if (city) {
            getCoordinates(city);
            error.innerHTML = ""
        } else{
            error.innerHTML = "Please enter City"
        
            return;
        }
 
   }
   //city name and find lat and lon coordinates
    var getCoordinates = function(city) {

        var apiurl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIkey
        fetch (apiurl)
        .then (function(res) {
            error.innerhtml = ""
            return res.JSON();
        })
        .then (function(data) {
            var lat = (data[0].lat)
            var lon = (data[0].lon)
            getweather (lat, lon)
        })
    
    // error if a valid city is not entered
    .catch(function(error){
        error.innerHTML = "Enter A Valid City!";
        return;
    })}

    var displayWeather = function(lat, lon){
        var apiurl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +"&lon=" + lon + "&units=imperial&appid=" + APIkey
        fetch (apiurl)
        .then(function(res) {
            if (res,ok){
                return res.json();

            }else{
                alert("Invalid")
            }

        }) 
        .then(function(data){
            getWeather(data);
            getForecast(data);
        })
    }
    //current weather

    var getWeather = function(data) {
        var apiurl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.lat +"&lon=" + data.lon + "&limit=1&appid" + APIkey
        var icon =  "https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png"
        fetch(apiurl)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            currentweather.innerHTML = data[0].name +"(" + SVGAnimateMotionElement().format("M/D/YYYY") + ")";
            currenticon.innerHTML = "<img src=" + icon + ">";
            saveSearch(data[0].name);
        })

        temp.textContent = "Temp: " + data.current.temp + ""
        wind.textContente = "Wind: " + data.current.wind_speed + " MPH"
        humid.textContent = "Humidity: " + data.current.humidity + " %"

        if (data.current.uvi < 2) {
            uvi.innerHTML = "UV Index: " + "<span class='uvi-low'>" + data.current.uvi + "</span>"
        }
        else if (data.current.uvi < 5) {
            uvi.innerHTML = "UV Index: " + "<span class='uvi-mid'>" + data.current.uvi + "</span>"
        }
        else if (data.current.uvi < 7) {
            uvi.innerHTML = "UV Index: " + "<span class='uvi-high'>" + data.current.uvi + "</span>"
    }
    else  {
        uvi.innerHTML = "UV Index: " + "<span class='uvi-vhigh'>" + data.current.uvi + "</span>"
}
    }