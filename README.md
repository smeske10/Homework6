- Created Navbar
- Created left column for search + searchHistory
- Created right column with 2 divs for current weather and forecast
- Created 5 cards for 5-day forecast
- Created javascript to get weather from openweathermap API
- created javascript to pull data from API call and place it in HTML Element
- Backlog: Icon won't show with iconify api, 5-day forecast isn't displaying properly, Buttons were working, now there is a bug

Github: https://github.com/smeske10/Homework6
Site: https://smeske10.github.io/Homework6/




# Homework6
 Server Side APIs

 # 06 Server-Side APIs: Weather Dashboard

Use the [OpenWeather One Call API](https://openweathermap.org/api/one-call-api) to retrieve weather data for cities. Read through the documentation for setup and usage instructions. You will use `localStorage` to store any persistent data. For more information on how to work with the OpenWeather API, refer to the [Full-Stack Blog on how to use API keys](https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys).

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

### Technical Acceptance Criteria: 40%

* Satisfies all of the above acceptance criteria plus the following:

    * Uses the OpenWeather API to retrieve weather data.

    * Uses `localStorage` to store persistent data.
