import { getWeatherByCoordinates } from "./dataGet";
import { updateCurrentData } from "./dataDisplay";

const options = {
  timeout: 5000
};

async function success(position) {
  const { latitude, longitude } = position.coords;
  const weatherObj = await getWeatherByCoordinates(latitude, longitude);
  updateCurrentData(weatherObj);
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
  return msg;
}

function displayCurrentData() {
  if (!navigator.geolocation) {
    alert("Sorry, geolocation is not supported in your browser...");
    return;
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
}

export default displayCurrentData;
