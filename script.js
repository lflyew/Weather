localStorage.clear;
// Variables created
var APIkey = '558872b4719f78b0116470aa2fdbdd69'
var searchboxEl = document.querySelector("#search-box");
var citysearchEl = document.querySelector("#city");
var currentweatherEl = document.querySelector("#heading");
var currentdata = document.querySelector("#current-data");
var clearbtn = document.querySelector("#clear-btn");
var searchpanel = document.querySelecto("#search-panel");
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
    }