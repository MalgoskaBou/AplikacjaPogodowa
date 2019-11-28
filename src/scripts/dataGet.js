import getKey from "./apikey.js";

const key = getKey();
const url = "https://api.openweathermap.org/data/2.5/";

async function getWeatherByCity(city) {
  const urlCity = `${url}weather?q=${city}&units=metric&appid=${key}`;
  try {
    const rawWeatherData = await fetch(urlCity);
    const finalWeather = mapToWeatherObj(rawWeatherData);
    return finalWeather;
  } catch (err) {
    console.log(err);
  }
}

async function getWeatherByCoordinates(lat, lon) {
  let urlCity = `${url}weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
  try {
    const rawWeatherData = await fetch(urlCity);
    const finalWeather = await mapToWeatherObj(rawWeatherData);
    return finalWeather;
  } catch (err) {
    console.log(err);
  }
}

async function mapToWeatherObj(rawWeatherData) {
  const weatherObj = await rawWeatherData.json();

  const currentDate = () => {
    const a = new Date(weatherObj.dt * 1000);
    const year = a.getFullYear();
    const month = a.getMonth() + 1;
    const day = a.getDate();
    const time = day + "-" + month + "-" + year;
    return time;
  };

  const weatherInfo = {
    city: weatherObj.name,
    date: currentDate(),
    temp: Math.round(weatherObj.main.temp),
    tempMin: Math.round(weatherObj.main.temp_min),
    tempMax: Math.round(weatherObj.main.temp_max),
    wind: weatherObj.wind.speed,
    pressure: weatherObj.main.pressure,
    humidity: weatherObj.main.humidity,
    description: weatherObj.weather[0].description,
    icon: weatherObj.weather[0].icon
  };
  return weatherInfo;
}

export { getWeatherByCity, getWeatherByCoordinates };

// HOW TO USE
/*
getWeatherByCity("Wroclaw").then((response) => {
    console.log(response);
})
getWeatherByCoordinates(51.1089776, 17.0326689).then((response) => {
    console.log(response);
})
*/
