import displayWeatherByCoordinates from "./scripts/geolocation";
import { getWeatherByCity } from "./scripts/dataGet";
import displayData from "./scripts/meteoDataDisplay";

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
    .then(dataObj => displayData(dataObj))
    .catch(err => console.log(err));
}

const searchForm = document.querySelector(".main__form");
const geolocationButton = document.querySelector(".localization__findme-btn");

document.addEventListener("DOMContentLoaded", weatherByCoordinates);
searchForm.addEventListener("input", showCities);
searchForm.addEventListener("submit", weatherByCity);
geolocationButton.addEventListener("click", weatherByCoordinates);
