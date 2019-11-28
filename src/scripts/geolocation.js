import { getWeatherByCoordinates } from "./dataGet";
import updateData from "./meteoDataDisplay";

const geoData = [];

const options = {
  // enableHighAccuracy: true,
  // maximumAge: 0,
  timeout: 5000
};

async function success(position) {
  geoData[0] = position.coords.latitude.toFixed(5);
  geoData[1] = position.coords.longitude.toFixed(5);
  geoData[2] = position.coords.accuracy.toFixed(1);
  const weatherObj = await getWeatherByCoordinates(geoData[0], geoData[1]);
  updateData(weatherObj);
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

function getLocation() {
  if (!navigator.geolocation) {
    alert("Sorry, geolocation is not supported in your browser...");
    return;
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
}

export default getLocation;
