import getKey from "./apikey.js";
import {updateCurrentData} from "./dataDisplay";
import {renderCitiesList, saveData} from "./localStorage";

const key = getKey();
const url = "https://api.openweathermap.org/data/2.5/";


async function getWeatherByCity(city) {
    const urlCity = `${url}weather?q=${city}&units=metric&appid=${key}`;
    try {
        const rawWeatherData = await fetch(urlCity)
        const weatherData = await mapToWeatherObj(rawWeatherData);
        updateCurrentData(weatherData);
        saveData();
        renderCitiesList();
        document.querySelector(".form__search").blur();
    } catch (err) {
        document.querySelector(".form__search").blur();
        if (err === 404) {
          alert("Sorry, we couldn't find weather data for your city.");
        } else if (err === 401) {
          alert("Sorry, your API key is not correct.");
        } else {
          alert("An unknown error occurred.");
        }
    }
}


async function getWeatherByCoordinates(lat, lon) {
  let urlCity = `${url}weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
  try {
    const rawWeatherData = await fetch(urlCity).then(response => {
      if (response.status != 200) {
        throw response.status;
      }
      return response;
    });
    const finalWeather = await mapToWeatherObj(rawWeatherData);
    return finalWeather;
  } catch (err) {
    throw err;
  }
}

async function mapToWeatherObj(rawWeatherData) {
  const weatherObj = await rawWeatherData.json();

  const weatherInfo = {
    city: weatherObj.name,
    temp: Math.round(weatherObj.main.temp),
    tempMin: Math.round(weatherObj.main.temp_min),
    tempMax: Math.round(weatherObj.main.temp_max),
    wind: Math.round(weatherObj.wind.speed * 3.6),
    pressure: weatherObj.main.pressure,
    humidity: weatherObj.main.humidity,
    description: weatherObj.weather[0].description,
    icon: weatherObj.weather[0].icon
  };
  return weatherInfo;
}


export { getWeatherByCity, getWeatherByCoordinates };