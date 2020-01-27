import {updateCurrentData, updateTime} from "./dataDisplay";
import {renderCitiesList, saveData} from "./dataSaveAndRead";

const key = process.env.API_KEY;
const url = "https://api.openweathermap.org/data/2.5/";

async function getWeatherByCity(city) {
    const urlCity = `${url}weather?q=${city}&units=metric&appid=${key}`;
        fetch(urlCity)
        .then(response => {
            if (!response.ok) throw new Error(response.status);
            return mapToWeatherObj(response);
        })
        .then(weatherData => {
            updateCurrentData(weatherData);
            updateTime(weatherData.timezone);
            setInterval(() => updateTime(weatherData.timezone), 30000);
            saveData(weatherData.city);
            renderCitiesList();
            document.querySelector(".form__search").blur();
        })
        .catch(err => {
            if (err.message === '404') {
                console.log('Not found. Failed to find the given city name.');
                alert("Failed to find the given city name.");
            } else {
                console.log(err);
                alert("An error occurred. Failed to load the weather data.");
            }
        })
}


async function getWeatherByCoordinates(lat, lon) {
    const urlCity = `${url}weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;

        fetch(urlCity)
        .then(response => {
            if (!response.ok) throw new Error(response.status);
            return mapToWeatherObj(response);
        })
        .then(weatherData => {
            updateCurrentData(weatherData);
            updateTime(weatherData.timezone);
            setInterval(() => updateTime(weatherData.timezone), 30000);
            saveData(weatherData.city);
            renderCitiesList();
        })
        .catch(err => {
            if (err.message === '404') {
                console.log('Not found. Failed to find the given city name.');
                alert("Failed to load weather data for your geolocation. Try to type the name of the city below.");
            } else {
                console.log(err);
                alert("An error occurred. Failed to load the weather data.");
            }
        })
}

async function mapToWeatherObj(rawWeatherData) {
  const weatherObj = await rawWeatherData.json();

  const weatherInfo = {
    city: weatherObj.name,
    country: weatherObj.sys.country,
    temp: Math.round(weatherObj.main.temp),
    tempMin: Math.round(weatherObj.main.temp_min),
    tempMax: Math.round(weatherObj.main.temp_max),
    wind: Math.round(weatherObj.wind.speed * 3.6),
    pressure: weatherObj.main.pressure,
    humidity: weatherObj.main.humidity,
    description: weatherObj.weather[0].description,
    icon: weatherObj.weather[0].icon,
    timezone: weatherObj.timezone,
  };
  return weatherInfo;
}


export { getWeatherByCity, getWeatherByCoordinates };