import displayWeatherByCoordinates from "./scripts/geolocation";
import { getWeatherByCity } from "./scripts/dataGet";
import { getForecastByCity } from "./scripts/getForecast";
import { updateCurrentData, updateForecastData } from "./scripts/dataDisplay";
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
    .catch(err => {
      document.querySelector(".form__search").blur();
      if (err !== 200) {
        if (err === 404) {
          alert("Sorry, we couldn't find weather data for your city.");
        } else if (err === 401) {
          alert("Sorry, your API key is not correct.");
        } else {
          alert("An unknown error occurred.");
        }
      }
    });

  getForecastByCity(city)
    .then(dataObj => updateForecastData(dataObj))
    .catch(err => {
      document.querySelector(".form__search").blur();
      if (err !== 200) {
        if (err === 404) {
          console.log("Sorry, we couldn't find weather data for your city.");
        } else if (err === 401) {
          console.log("API key is not correct");
        } else {
          console.log("An unknown error occurred");
        }
      }
    });

  // document.querySelector(".form__search").blur();
}


const moment = require('moment');
const currentTime = document.querySelector(".main__date");
(function timedUpdate () {
  currentTime.innerHTML = moment().format('Do MMMM YYYY, h:mm a');
  setTimeout(timedUpdate, 60000);
})()


const searchForm = document.querySelector(".main__form");
const geolocationButton = document.querySelector(".localization__findme-btn");

document.addEventListener("DOMContentLoaded", weatherByCoordinates);
geolocationButton.addEventListener("click", weatherByCoordinates);
searchForm.addEventListener("input", showCities);
searchForm.addEventListener("submit", weatherByCity);