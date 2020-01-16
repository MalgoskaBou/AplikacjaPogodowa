import {getWeatherByCoordinates} from "./getCurrentWeather";
import {getForecastByCoordinates} from "./getForecast";
import {updateCurrentData, updateForecastData} from "./dataDisplay";
import { renderCitiesList, saveData } from './localStorage';

const options = {
  timeout: 5000
};

async function success(position) {
  const {latitude, longitude} = position.coords;
  //current weather data:
  await getWeatherByCoordinates(latitude, longitude)
  .then(weatherObj => {
    updateCurrentData(weatherObj);
    saveData();
    renderCitiesList();
  });
  //forecast weather data:
  await getForecastByCoordinates(latitude, longitude)
  .then(forecastObj => updateForecastData(forecastObj));
}

function error(err) {
  let msg = "";
  switch (err.code) {
    case err.PERMISSION_DENIED:
      msg = "User denied the request for geolocation.";
      break;
    case err.POSITION_UNAVAILABLE:
      msg = "Location information is unavailable.";
      break;
    default:
      msg = "An unknown error occurred.";
  }
  alert(msg);
}

function weatherByCoordinates() {
  if (!navigator.geolocation) {
    alert("Sorry, geolocation is not supported in your browser...");
    return;
  }
  navigator.geolocation.getCurrentPosition(success, error, options);
}

export default weatherByCoordinates;