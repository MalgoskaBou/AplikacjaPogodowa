import displayWeatherByCoordinates from "./scripts/geolocation";
import { getWeatherByCity } from "./scripts/dataGet";
import { getForecastByCity } from "./scripts/getForecast";
import { updateCurrentData, updateForecastData } from "./scripts/dataDisplay";
import { getData,  renderCitiesList, saveData } from "./scripts/localStorage";
import "./styles/main.css";


async function weatherByCoordinates() {
  await displayWeatherByCoordinates();
  saveData();
  renderCitiesList();
}

async function weatherByCity(e) {
  e.preventDefault();
  const city = document.querySelector(".form__search").value;

  getWeatherByCity(city)
    .then(dataObj => {
      updateCurrentData(dataObj);
      saveData();
      renderCitiesList();
      document.querySelector(".form__search").blur();
    })
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
}


const moment = require('moment');
const currentTime = document.querySelector(".main__date");
(function timedUpdate () {
  currentTime.innerHTML = moment().format('Do MMMM YYYY, h:mm a');
  setTimeout(timedUpdate, 30000);
})()


async function startApp() {
  const cities = getData();

  if (cities.length === 0) {
    await weatherByCoordinates();
  } else {
  renderCitiesList(cities);
  document.querySelector(".form__search").value = cities[0];
  }
}


const searchForm = document.querySelector(".main__form");
const geolocationButton = document.querySelector(".localization__findme-btn");

document.addEventListener("DOMContentLoaded", startApp);
geolocationButton.addEventListener("click", weatherByCoordinates);
searchForm.addEventListener("submit", weatherByCity);