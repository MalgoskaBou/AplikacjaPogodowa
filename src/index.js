import displayWeatherByCoordinates from "./scripts/geolocation";
import {
  getWeatherByCity
} from "./scripts/dataGet";
import {
  updateCurrentData
} from "./scripts/dataDisplay";

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
  console.log(city);
  getWeatherByCity(city)
    .then(dataObj => updateCurrentData(dataObj))
    .catch(err => console.log(err));
  document.querySelector('.form__search').activeElement = false; // NOT WORKING
}

const searchForm = document.querySelector(".main__form");
const geolocationButton = document.querySelector(".localization__findme-btn");

document.addEventListener("DOMContentLoaded", weatherByCoordinates);
geolocationButton.addEventListener("click", weatherByCoordinates);
searchForm.addEventListener("input", showCities);
searchForm.addEventListener("submit", weatherByCity);