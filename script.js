localStorage.clear;

var API key = '558872b4719f78b0116470aa2fdbdd69'
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

function find(){
    var city = titleCase ($("#city")[0].value.trim());

    var API_Url = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"
}