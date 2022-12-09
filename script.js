// Variables created
var APIkey = '829a8abf9ba97f109b53bd49897b45fc';
const citysearch = document.querySelector("#city");
const currentweather = document.querySelector("#heading");
const currentdata = document.querySelector("#current-data");
const clearbtn = document.querySelector("#clear-btn");
const searchpanel = document.querySelector("#search-panel");
const error = document.querySelector("#error-box");
const temp = document.querySelector("#temp");
const humid = document.querySelector("#humid");
const uvi = document.querySelector("#uvi");
var searchbox = document.querySelector("#search-box");

const weathericon = document.querySelector("#weather-icon");
const currenticon = document.querySelector("#current-icon");
const wind = document.querySelector("#wind");
    
searchbox.addEventListener('submit', function(event){
    event.preventDefault();
    var city = citysearch.value
    if (city) {

                    getCoordinates(city);
                    error.innerHTML = ""
                } else{
                    error.innerHTML = "Please enter City"
                
                    return;
                }
})


var search = JSON.parse(localStorage.getItem("search") || "[]");
// //Search city
// let formSumbitHandler = function (event) {
//     event.preventDefault();
//     let city =  citysearch.value.trim();
//     citysearch.value = "";
// //Error message if city name not entered
//         if (city) {

//             getCoordinates(city);
//             error.innerHTML = ""
//         } else{
//             error.innerHTML = "Please enter City"
        
//             return;
//         }
 
   
   //city name and find lat and lon coordinates
    let getCoordinates = function(city) {

        let apiurl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIkey;
        fetch (apiurl)
        .then (function(res) {
            error.innerhtml = ""
            return res.json();
        })
        .then (function(data) {
            let lat = (data[0].lat)
            let lon = (data[0].lon)
            displayWeather (lat, lon)
        })
    
    // error if a valid city is not entered
    .catch(function(error){
        error.innerHTML = "Enter A Valid City!";
        return;
    })}

    let displayWeather = function(lat, lon){
        let apiurl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +"&lon=" + lon + "&units=imperial&appid=" + APIkey
        fetch (apiurl)
        .then(function(res) {
            if (res.ok){
                return res.json();

            }else{
                alert("Invalid")
            }

        }) 
        .then(function(data){
            displayWeather(data);
            display5DayForecast(data);
        })
    }
    //current weather

    let getWeather = function(data) {
        let apiurl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.lat +"&lon=" + data.lon + "&limit=1&appid" + APIkey
        let icon =  "https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png"
        fetch(apiurl)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            currentweather.innerHTML = data[0].name +"(" + SVGAnimateMotionElement().format("M/D/YYYY") + ")";
            currenticon.innerHTML = "<img src=" + icon + ">";
            saveSearch(data[0].name);
        })

        temp.textContent = "Temp: " + data.current.temp + "\u00B0F"
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

// Five day forecast-weather data
    let display5DayForecast = function(data){
        for (i = 1; i < 6; i++) {
            let current = document.querySelector("#card" + i + "-title");
            current.textContent = moment().add(i, 'd').format("M/D/YY");
            let forecastD = document.querySelector("#card" + i);
            forecastD.classList.remove("d-none");
        }
    

    for ( j = 0; j < 5; j++){
        let currentdataD = data.daily[d]
        let linkicon = "https://openweathermap.org/img/w/" + currentData.weather[0].icon + ".png"
        let icon = document.querySelector("#card" + j + "-icon");
        icon.src = linkicon
        let tempD = document.querySelector("#card" + j + "-temp")
        tempD.innerHTML = "Temp: " + currentdataD.temp.day + "\u00B0F" 
        let windD = document.querySelector("#card" + j + "-wind")
        windD.nerHTML = "Wind: " + currentdataD.wind_speed + " MPH" 
        let humidD = document.querySelector("#card" + j + "-humid")
        humidD.innerHTML = "Humidity: " + currentdataD.humidity + " %" 
    }
    }

let saveSearch = function(city) {
    if (search.includes(city)) {
        return;
    } else {
        search.push(city)
        localStorage.setItem("search", JSON.stringify(search));
        loadSearch();
    }
}

let loadSearch = function() {
    if (search.length > 0) {
        searchpanel.innerHTML = "";
        for (i = 0; i < search.length; i++) {
            let searchbtn = document.createElement("button")
            searchbtn.className = "w-100 m-o search-btn mb-2 pe-auto"
            searchbtn.textContent = search[i]
            searchpanel.appendChild(searchbtn)
        }
    }else{
        searchpanel.innerHTML = "";
    }
    }
    let clearS = function() {
        search = [];
        localStorage.clear();
        loadSearch();
    }
    let reSearch = function(event){
        if(event.target.innerHTML.includes("<")){
            return;
        }else{
            getCoordinates(event.target.innerHTML)
        }
    }
loadSearch();
searchbox.addEventListener("submit", formSumbitHandler);
clearbtn.addEventListener("click", clearS);
searchpanel.addEventListener("click", reSearch);