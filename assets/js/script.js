//DOM Elements
var search = document.querySelector('#search');
var searchBtn = document.querySelector('.searchBtn');
var historySearchBtn = document.querySelector('.historySearchBtn');
var city = document.getElementById('city');
var temp = document.getElementById('temp');
var wind = document.getElementById('wind');
var humidity = document.getElementById('humidity');
var uv = document.getElementById('uv');
var tempForecast1 = document.getElementById('tempForecast1'); var tempForecast2 = document.getElementById('tempForecast2'); var tempForecast3 = document.getElementById('tempForecast3'); var tempForecast4 = document.getElementById('tempForecast4'); var tempForecast5 = document.getElementById('tempForecast5');
var windForecast1 = document.getElementById('windForecast1');var windForecast2 = document.getElementById('windForecast2');var windForecast3 = document.getElementById('windForecast3');var windForecast4 = document.getElementById('windForecast4');var windForecast5 = document.getElementById('windForecast5');
var humidityForecast1 = document.getElementById('humidityForecast1');var humidityForecast2 = document.getElementById('humidityForecast2');var humidityForecast3 = document.getElementById('humidityForecast3');var humidityForecast4 = document.getElementById('humidityForecast4');var humidityForecast5 = document.getElementById('humidityForecast5');
var weatherIcon1 = document.getElementById('weatherIcon1');var weatherIcon2 = document.getElementById('weatherIcon2'); var weatherIcon3 = document.getElementById('weatherIcon3'); var weatherIcon4 = document.getElementById('weatherIcon4'); var weatherIcon5 = document.getElementById('weatherIcon5')
var day1 = document.getElementById('day1'); var day2 = document.getElementById('day2'); var day3 = document.getElementById('day3'); var day4 = document.getElementById('day4'); var day5 = document.getElementById('day5')
var dateForecast1 = document.getElementById('dateForecast1'); var dateForecast2 = document.getElementById('dateForecast2'); var dateForecast3 = document.getElementById('dateForecast3'); var dateForecast4 = document.getElementById('dateForecast4'); var dateForecast5 = document.getElementById('dateForecast5')
let currentDate = new Date();
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();

//Submitted City collected
var formSubmitHandler = function (event) {
    event.preventDefault();

    var searchCity = search.value.trim();
    var cityHistory = sessionStorage.setItem('cityHistory', search.value)

    if (searchCity) {
        displayHistory(cityHistory);
        getCoordinates(searchCity)
        getCurrentWeather(searchCity);
        getWeatherForecast(searchCity);

        searchHistory.textContent = '';
        search.textContent = '';
    } else {
        alert('Please enter a city and state');
    }
};

const displayHistory = function () {
    const searchHistory = document.getElementById('history');
    const searchHistoryEl = document.createElement('div')
    const searchHistoryBtn = document.createElement('button')

    searchHistory.append(searchHistoryEl);
    searchHistoryEl.append(searchHistoryBtn);
    searchHistoryBtn.classList = "btn-secondary historySearchBtn";

    searchHistoryBtn.innerHTML = sessionStorage.getItem('cityHistory');
    historySearchBtn.addEventListener('click', historySelect);
};

const historySelect = function (event) {
    event.preventDefault();

    var cityHistory = this.button.innerHTML
    console.log("Is this even working?")

    displayHistory(cityHistory);
    getCoordinates(cityHistory)
    getCurrentWeather(cityHistory);
    getWeatherForecast(cityHistory);
}

//Onload API call for Forecast
window.onload = function () {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=6b1721c2618cf51580986feecb262fb5'
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayCurrentWeather(data);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to OpenWeather');
        });

    const apiUrl2 = 'https://api.openweathermap.org/data/2.5/forecast?q=philadelphia,pa,us&appid=6b1721c2618cf51580986feecb262fb5'
    fetch(apiUrl2)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                const day1Info = data.list[4]
                const day2Info = data.list[12]
                const day3Info = data.list[20]
                const day4Info = data.list[28]
                const day5Info = data.list[36]

                displayWeatherForecast(day1Info, day2Info, day3Info, day4Info, day5Info);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to OpenWeather');
    });
}


const getCoordinates = function () {
    var searchValue = search.value.split(" ").join("").toLowerCase() + ',us'
    var apiUrlCoordinates = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchValue + '&appid=6b1721c2618cf51580986feecb262fb5'

    fetch(apiUrlCoordinates)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    getCurrentWeather(data);
                    getWeatherForecast(data);
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
const getCurrentWeather = function (weather) {
    const longitude = weather.coord.lon.toString();
    const latitude = weather.coord.lat.toString();

    const apiUrl1 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=hourly,daily&appid=6b1721c2618cf51580986feecb262fb5'
    fetch(apiUrl1)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayCurrentWeather(data);
                    displayHistory;
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        }).catch(function (error) {
            alert('Unable to connect to OpenWeather');
        });
};

const getWeatherForecast = function (weather) {
    let searchValue = search.value.split(" ").join("").toLowerCase() + ',us'

        const apiUrl2 = 'https://api.openweathermap.org/data/2.5/forecast?q=' + searchValue + '&appid=6b1721c2618cf51580986feecb262fb5'
        fetch(apiUrl2)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        const day1Info = data.list[4]
                        const day2Info = data.list[12]
                        const day3Info = data.list[20]
                        const day4Info = data.list[28]
                        const day5Info = data.list[36]

                        displayWeatherForecast(day1Info, day2Info, day3Info, day4Info, day5Info);
                    });
                } else {
                    alert('Error: ' + response.statusText);
                }
            })
            .catch(function (error) {
                alert('Unable to connect to OpenWeather');
            });
};



function displayCurrentWeather(weatherCurrent) {
    city.innerHTML = search.value + " " + "<br>" + cMonth + "/" + cDay + "/" + cYear + "</b>"
    if (search.value == '') {
        city.innerHTML = 'Philadelphia, PA' + " " + "<br>" + cMonth + "/" + cDay + "/" + cYear + "</b>";
    }
    // if (weatherForecast.current.weather.main === 'Clouds') {
    //     icon.data('icon', 'wi:cloudy')
    // }

    const currentTemp = ((weatherCurrent.current.temp - 273.15) * 1.8 + 32).toFixed(1);
    temp.innerHTML = 'Temp: ' + currentTemp + '&#176;F';

    const currentWind = weatherCurrent.current.wind_speed;
    wind.innerHTML = 'Wind: ' + currentWind + 'mph';

    const currentHumidity = weatherCurrent.current.humidity;
    humidity.innerHTML = 'Humidity: ' + currentHumidity + '%';

    const currentUvi = weatherCurrent.current.uvi;
    uv.innerHTML = 'UV Index: ' + currentUvi + ' of 10';
    if (currentUvi > 5.999) {
        uv.style.color = 'red'
    } else if (currentUvi < 2.0001) {
        uv.style.color = 'green'
    } else {
        uv.style.color = 'yellow'
    }
};

function displayWeatherForecast(day1Info, day2Info, day3Info, day4Info, day5Info) {

    //Day 1
    dateForecast1.innerHTML = "<br>" + day1Info.dt_txt + "</b>"
    if (day1Info.weather[0].main == 'Clear') {
        weatherIcon1.className = 'fas fa-sun fa-3x'
    } else if (day1Info.weather[0].main == 'Clouds') {
        weatherIcon1.className = 'fas fa-cloud-sun fa-3x'
    } else if (day1Info.weather[0].main == 'Rain') {
        weatherIcon1.className = '	fas fa-cloud-rain fa-3x'
    }
    
    let forecastTemp1 = ((day1Info.main.temp - 273.15) * 1.8 + 32).toFixed(1);
    tempForecast1.innerHTML = 'Temp: ' + forecastTemp1 + '&#176;F';

    let forecastWind1 = day1Info.wind.speed;
    windForecast1.innerHTML = 'Wind: ' + forecastWind1 + 'mph';

    let forecastHumidity1 = day1Info.main.humidity;
    humidityForecast1.innerHTML = 'Humidity: ' + forecastHumidity1 + '%';

    //Day 2
    dateForecast2.innerHTML = "<br>" + day2Info.dt_txt + "</b>"
    if (day2Info.weather[0].main == 'Clear') {
        weatherIcon2.className = 'fas fa-sun fa-3x'
    } else if (day2Info.weather[0].main == 'Clouds') {
        weatherIcon2.className = 'fas fa-cloud-sun fa-3x'
    } else if (day2Info.weather[0].main == 'Rain') {
        weatherIcon2.className = '	fas fa-cloud-rain fa-3x'
    }

    let forecastTemp2 = ((day2Info.main.temp - 273.15) * 1.8 + 32).toFixed(1);
    tempForecast2.innerHTML = 'Temp: ' + forecastTemp2 + '&#176;F';

    let forecastWind2 = day2Info.wind.speed;
    windForecast2.innerHTML = 'Wind: ' + forecastWind2 + 'mph';

    let forecastHumidity2 = day1Info.main.humidity;
    humidityForecast2.innerHTML = 'Humidity: ' + forecastHumidity2 + '%';

    //Day 3
    dateForecast3.innerHTML = "<br>" + day3Info.dt_txt + "</b>"
    if (day3Info.weather[0].main == 'Clear') {
        weatherIcon3.className = 'fas fa-sun fa-3x'
    } else if (day3Info.weather[0].main == 'Clouds') {
        weatherIcon3.className = 'fas fa-cloud-sun fa-3x'
    } else if (day3Info.weather[0].main == 'Rain') {
        weatherIcon3.className = '	fas fa-cloud-rain fa-3x'
    }

    let forecastTemp3 = ((day3Info.main.temp - 273.15) * 1.8 + 32).toFixed(1);
    tempForecast3.innerHTML = 'Temp: ' + forecastTemp3 + '&#176;F';

    let forecastWind3 = day3Info.wind.speed;
    windForecast3.innerHTML = 'Wind: ' + forecastWind3 + 'mph';

    let forecastHumidity3 = day3Info.main.humidity;
    humidityForecast3.innerHTML = 'Humidity: ' + forecastHumidity3 + '%';

    //Day 4
    dateForecast4.innerHTML = "<br>" + day4Info.dt_txt + "</b>"
    if (day4Info.weather[0].main == 'Clear') {
        weatherIcon4.className = 'fas fa-sun fa-3x'
    } else if (day4Info.weather[0].main == 'Clouds') {
        weatherIcon4.className = 'fas fa-cloud-sun fa-3x'
    } else if (day4Info.weather[0].main == 'Rain') {
        weatherIcon4.className = '	fas fa-cloud-rain fa-3x'
    }

    let forecastTemp4 = ((day4Info.main.temp - 273.15) * 1.8 + 32).toFixed(1);
    tempForecast4.innerHTML = 'Temp: ' + forecastTemp4 + '&#176;F';

    let forecastWind4 = day4Info.wind.speed;
    windForecast4.innerHTML = 'Wind: ' + forecastWind4 + 'mph';

    let forecastHumidity4 = day4Info.main.humidity;
    humidityForecast4.innerHTML = 'Humidity: ' + forecastHumidity4 + '%';

    //Day 5
    dateForecast5.innerHTML = "<br>" + day5Info.dt_txt + "</b>"
    if (day5Info.weather[0].main == 'Clear') {
        weatherIcon5.className = 'fas fa-sun fa-3x'
    } else if (day5Info.weather[0].main == 'Clouds') {
        weatherIcon5.className = 'fas fa-cloud-sun fa-3x'
    } else if (day5Info.weather[0].main == 'Rain') {
        weatherIcon5.className = '	fas fa-cloud-rain fa-3x'
    }

    let forecastTemp5 = ((day5Info.main.temp - 273.15) * 1.8 + 32).toFixed(1);
    tempForecast5.innerHTML = 'Temp: ' + forecastTemp5 + '&#176;F';

    let forecastWind5 = day5Info.wind.speed;
    windForecast5.innerHTML = 'Wind: ' + forecastWind5 + 'mph';

    let forecastHumidity5 = day5Info.main.humidity;
    humidityForecast5.innerHTML = 'Humidity: ' + forecastHumidity5 + '%';
}

searchBtn.addEventListener('click', formSubmitHandler);
