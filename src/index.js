import displayWeatherByCoordinates from "./scripts/geolocation";
import {getWeatherByCity} from "./scripts/getCurrentWeather";
import {getForecastByCity} from "./scripts/getForecast";
import {getData, renderCitiesList, saveData} from "./scripts/localStorage";
import "./styles/main.css";
const isOnline = require("is-online");

require( './scripts/apikey');

async function weatherByCoordinates() {
  await displayWeatherByCoordinates();
  saveData();
  renderCitiesList();
}

async function weatherByCity(e) {
    e.preventDefault();
    const city = document.querySelector(".form__search").value;
    try {
        await getWeatherByCity(city);
        await getForecastByCity(city);
        document.querySelector(".form__search").value = getData()[0] || "";
    } catch(err) {
        alert(err.message);
    }
}

async function weatherBySavedCity(e) {
    const city = e.target.innerText;
    try {
        await getWeatherByCity(city);
        await getForecastByCity(city);
        document.querySelector(".form__search").value = getData()[0] || "";
    } catch(err) {
        alert(err.message);
    }
}

const moment = require('moment');
const currentTime = document.querySelector(".main__date");
(function timedUpdate() {
  currentTime.innerHTML = moment().format('Do MMMM YYYY, HH:mm');
  setTimeout(timedUpdate, 30000);
})()

async function startApp() {
    console.log(savedCities);
  if (!await isOnline()) {
    alert("No internet connection.")
  }

  const cities = getData();
  if (cities.length === 0) {
    await weatherByCoordinates();
  } else {
    await getWeatherByCity(cities[0]);
    await getForecastByCity(cities[0]);
    renderCitiesList(cities);
    document.querySelector(".form__search").value = cities[0] || "";
  }
}

const searchForm = document.querySelector(".main__form");
const geolocationButton = document.querySelector(".localization__findme-btn");
const savedCities = document.querySelector(".form__suggestions");

document.addEventListener("DOMContentLoaded", startApp);
geolocationButton.addEventListener("click", weatherByCoordinates);
searchForm.addEventListener("submit", weatherByCity);
savedCities.addEventListener("click", weatherBySavedCity);