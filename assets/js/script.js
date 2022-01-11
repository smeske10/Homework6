//DOM Elements
var searchHistory = document.querySelector('#history');
var search = document.querySelector('#search');
var searchBtn = document.querySelector('.searchBtn');
var city = document.getElementById('city');
var temp = document.getElementById('temp');
var wind = document.getElementById('wind');
var humidity = document.getElementById('humidity');
var uv = document.getElementById('uv');

document.addEventListener('DOMContentLoaded', getWeather);

//Submitted City collected
var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var searchCity = search.value.trim();
  
    if (searchCity) {
      getWeather(searchCity);
  
      searchHistory.textContent = '';
      search.textContent = '';
    } else {
      alert('Please enter a GitHub username');
    }
};

//Search city by user input 
var buttonClickHandler = function (event) {

    var searchCityHistory = event.target.getAttribute(search.value);
  
    if (searchCityHistory) {
      getWeather(localStorage.getItem('cityHistory'));

      searchHistory.textContent = '';
    }
}

//API Call to get weather
var getWeather = function (weather) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=6b1721c2618cf51580986feecb262fb5'

    fetch(apiUrl)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    displayWeather(data, weather);
                    displayHistory();
                });
            } else {
                alert('Error: ' + response.statusText);
              }
    })
        .catch(function (error) {
            alert('Unable to connect to OpenWeather');
        });
};

var displayHistory = function () {

    var searchHistoryEl = document.createElement('button')

    searchHistoryEl.classList = "btn-secondary searchBtn";
    searchHistoryEl.setAttribute('button', search.value);

    searchHistoryEl.innerHTML = search.value;

    searchHistory.appendChild(searchHistoryEl);

    localStorage.setItem('cityHistory', search.value)
};

var displayWeather = function (weatherForecast) {
    if (weatherForecast.length === 0) {
        city.textContent = 'City not found';
        return;
    }

    // var searchHistoryEl = document.createElement('button')

    // searchHistoryEl.classList = "btn-secondary searchBtn";
    // searchHistoryEl.setAttribute('button', search.value);

    // searchHistoryEl.innerHTML = search.value;
    
    // searchHistory.appendChild(searchHistoryEl);
};

searchBtn.addEventListener('click', formSubmitHandler);
searchHistory.addEventListener('click', buttonClickHandler);