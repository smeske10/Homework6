//DOM Elements
var searchHistory = document.querySelector('#history');
var search = document.querySelector('#search');
var city = document.getElementById('city');
var temp = document.getElementById('temp');
var wind = document.getElementById('wind');
var humidity = document.getElementById('humidity');
var uv = document.getElementById('uv');

window.onload(getWeather());

//Search city by user input 
var buttonClickHandler = function (event) {
    var searchCity = event.target.getAttribute(search.value);
  
    if (searchCity) {
      getWeather(searchCity);
    }
    searchHistory.textContent = '';
    var searchHistoryEl = searchHistory.createElement('button')
    searchHistoryEl.classList = "searchBtn btn-secondary"
}

//API Call to get weather
var getWeather = function (weather) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?' + searchCity + '&exclude=hourly,daily&appid={API key}';
        
    // if (searchCity = '') {
    //     var defaultCity = 'Philadelphia'
    // }

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                displayWeather(data, weather);
            });
        }
    })
}

//Display weather on HTML
var displayWeather = function (weatherForecast, search) {
    if (weatherForecast.length === 0) {
        city.textContent = 'City not found';
        return;
    }
};

search.addEventListener('click', buttonClickHandler);
history.addEventListener('click', buttonClickHandler)