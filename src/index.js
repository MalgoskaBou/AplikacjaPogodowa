import displayWeatherByCoordinates from "./scripts/geolocation.js";
import {getWeatherByCity} from "./scripts/dataGet.js";
import {getForecastByCity} from "./scripts/getForecast.js";
import {updateCurrentData, updateForecastData} from "./scripts/dataDisplay.js";

import "./styles/main.css";

async function weatherByCoordinates() {
  await displayWeatherByCoordinates();
}

function showCities() {
  console.log("input event");
}

async function weatherByCity(e) {
  e.preventDefault();
  const city = document.querySelector(".form__search").value;

  getWeatherByCity(city)
    .then(dataObj => updateCurrentData(dataObj))
    .catch(err => console.log(err));

    getForecastByCity(city)
    .then(dataObj => updateForecastData(dataObj))
    .catch(err => console.log(err));
  
  document.querySelector(".form__search").blur();
}

const searchForm = document.querySelector(".main__form");
const geolocationButton = document.querySelector(".localization__findme-btn");

document.addEventListener("DOMContentLoaded", weatherByCoordinates);
geolocationButton.addEventListener("click", weatherByCoordinates);
searchForm.addEventListener("input", showCities);
searchForm.addEventListener("submit", weatherByCity);