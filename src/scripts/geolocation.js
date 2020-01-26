import {getWeatherByCoordinates} from "./getCurrentWeather";
import {getForecastByCoordinates} from "./getForecast";

const options = {
  timeout: 5000
};

async function success(position) {
    const {latitude, longitude} = position.coords;
    await getWeatherByCoordinates(latitude, longitude)
    await getForecastByCoordinates(latitude, longitude);
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
  console.log(msg);
  alert("Failed to load your current location. Please, type the name of the city below.");
}

function weatherByCoordinates() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported in your browser. Please, type the name of the city below.");
    return;
  }
  navigator.geolocation.getCurrentPosition(success, error, options);
}

export default weatherByCoordinates;