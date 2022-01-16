//DOM Elements
var searchHistory = document.querySelector('#history');
var search = document.querySelector('#search');
var searchBtn = document.querySelector('.searchBtn');
var city = document.getElementById('city');
var temp = document.getElementById('temp');
var wind = document.getElementById('wind');
var humidity = document.getElementById('humidity');
var uv = document.getElementById('uv');
var tempForecast = document.getElementById('tempForecast');
var windForecast = document.getElementById('windForecast');
var humidityForecast = document.getElementById('humidityForecast');
var day1 = document.getElementById('day1')
var day2 = document.getElementById('day2')
var day3 = document.getElementById('day3')
var day4 = document.getElementById('day4')
var day5 = document.getElementById('day5')
let currentDate = new Date();
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();
var icon = document.getElementsByClassName('iconify')
document.addEventListener('DOMContentLoaded', getCurrentWeather, getWeatherForecast);

//Submitted City collected
var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var searchCity = search.value.trim();
  
    if (searchCity) {
      getCoordinates(searchCity)
      getCurrentWeather(searchCity);
      getWeatherForecast(searchCity);
  
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
      getCurrentWeather(localStorage.getItem('cityHistory'));
      displayHistory();
      searchHistory.textContent = '';
    }
}

//Onload API call for Current
window.onload = function () {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=6b1721c2618cf51580986feecb262fb5'
    
    fetch(apiUrl)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    displayCurrentWeather(data);
                });
            } else {
                alert('Error: ' + response.statusText);
              }
    })
        .catch(function (error) {
            alert('Unable to connect to OpenWeather');
        });
}

//Onload API call for Forecast
window.onload = function () {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=6b1721c2618cf51580986feecb262fb5'
    
    fetch(apiUrl)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    displayWeatherForecast(data);
                });
            } else {
                alert('Error: ' + response.statusText);
              }
    })
        .catch(function (error) {
            alert('Unable to connect to OpenWeather');
        });
}

var getCoordinates = function (coordinates) {
    var searchValue = search.value.split(" ").join("").toLowerCase() + ',us'
    var apiUrlCoordinates = 'https://api.openweathermap.org/data/2.5/weather?q='+ searchValue + '&appid=6b1721c2618cf51580986feecb262fb5'

    fetch(apiUrlCoordinates)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    getCurrentWeather(data);
                    getWeatherForecast();
                });
            } else {
                alert('Error: ' + response.statusText);
              }
    })
        .catch(function (error) {
            alert('Unable to connect to OpenWeather');
        });
}

//API Call to get weather
var getCurrentWeather = function (weather) {
    var longitude = weather.coord.lon.toString();
    var latitude = weather.coord.lat.toString();

    console.log(longitude)

    var apiUrl1 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=hourly,daily&appid=6b1721c2618cf51580986feecb262fb5'
    fetch(apiUrl1)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    displayCurrentWeather(data);
                    displayHistory;
                });
            } else {
                alert('Error: ' + response.statusText);
              }
    })
        .catch(function (error) {
            alert('Unable to connect to OpenWeather');
        });
};

var getWeatherForecast = function (weather) {
    var searchValue = search.value.split(" ").join("").toLowerCase() + ',us'
    var apiUrl2 = 'https://api.openweathermap.org/data/2.5/forecast?q='+ searchValue + '&appid=6b1721c2618cf51580986feecb262fb5'
    fetch(apiUrl2)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    displayWeatherForecast(data);
                });
            } else {
                alert('Error: ' + response.statusText);
              }
    })
        .catch(function (error) {
            alert('Unable to connect to OpenWeather');
        });
};

function displayHistory () {

    var searchHistoryEl = document.createElement('button')

    searchHistoryEl.classList = "btn-secondary searchBtn";
    searchHistoryEl.setAttribute('button', localStorage.getItem('cityHistory'));

    searchHistoryEl.innerHTML = localStorage.getItem('cityHistory');

    searchHistory.appendChild(searchHistoryEl);

    localStorage.setItem('cityHistory', search.value);
};

function displayCurrentWeather(weatherCurrent) {
    city.innerHTML = search.value + " " + "<br>" + cMonth + "/" + cDay + "/" + cYear + "</b>" 
    if(search.value == '') {city.innerHTML = 'Philadelphia, PA' + " " + "<br>" + cMonth + "/" + cDay + "/" + cYear + "</b>" ;}

    // if (weatherForecast.current.weather.main === 'Clouds') {
    //     icon.data('icon', 'wi:cloudy')
    // }

    var currentTemp = ((weatherCurrent.current.temp-273.15)*1.8+32).toFixed(2);
    temp.innerHTML = 'Temp: ' + currentTemp + '&#176;F';

    var currentWind = weatherCurrent.current.wind_speed;
    wind.innerHTML = 'Wind: ' + currentWind + 'mph';

    var currentHumidity = weatherCurrent.current.humidity;
    humidity.innerHTML = 'Humidity: ' + currentHumidity + '%';

    var currentUvi = weatherCurrent.current.uvi;
    uv.innerHTML = 'UV Index: ' + currentUvi + ' of 10';
    if (currentUvi>5.999) {
        uv.style.color = 'red'
    } else if (currentUvi<2.0001) {
        uv.style.color = 'green'
    } else {
        uv.style.color = 'yellow'
    }
};

function displayWeatherForecast(weatherForecast) {
    city.innerHTML = "<br>" + cMonth + "/" + cDay + "/" + cYear + "</b>" 
    if(search.value == '') {city.innerHTML = 'Philadelphia, PA' + " " + "<br>" + cMonth + "/" + cDay + "/" + cYear + "</b>" ;}

    for (var i = 0; i<weatherForecast.list; i+8) {
        let cDay = currentDate.getDate()+1;
        city.innerHTML = "<br>" + cMonth + "/" + cDay + "/" + cYear + "</b>" 

        var forecastTemp = ((weatherForecast.list[i].main.temp-273.15)*1.8+32).toFixed(2);
        tempForecast.innerHTML = 'Temp: ' + forecastTemp + '&#176;F';

        var forecastWind = weatherForecast.list[i].wind.speed;
        windForecast.innerHTML = 'Wind: ' + forecastWind + 'mph';

        var forecastHumidity = weatherForecast.main.humidity;
        windForecast.innerHTML = 'Humidity: ' + forecastHumidity + '%';
    }
};

searchBtn.addEventListener('click', formSubmitHandler);
searchHistory.addEventListener('click', buttonClickHandler);