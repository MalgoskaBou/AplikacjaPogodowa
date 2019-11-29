import getKey from "./apikey.js";

const key = getKey();
const url = "https://api.openweathermap.org/data/2.5/";


async function getWeatherByCity(city) {
  const urlCity = `${url}weather?q=${city}&units=metric&appid=${key}`;
  try {
    const rawWeatherData = await fetch(urlCity).then(response => {
      if (response.status != 200) {
        throw response.status;
      }
      return response;
    });
    const finalWeather = mapToWeatherObj(rawWeatherData);
    return finalWeather;
  } catch (err) {
    throw err;
  }
}


async function getWeatherByCoordinates(lat, lon) {
  let urlCity = `${url}weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
  try {
    const rawWeatherData = await fetch(urlCity).then(response => {
      if (response.status != 200) {
        throw response.status;
      }
      return response;
    });
    const finalWeather = await mapToWeatherObj(rawWeatherData);
    return finalWeather;
  } catch (err) {
    throw err;
  }
}


const currentDate = () => {
  const a = new Date(Date.now());
  const year = a.getFullYear();
  const month = a.getMonth() + 1;
  const day = a.getDate();
  const time = year + '-' + month + '-' + day;
  return time;
};


async function mapToWeatherObj(rawWeatherData) {
  const weatherObj = await rawWeatherData.json();

  const weatherInfo = {
    city: weatherObj.name,
    date: currentDate(),
    temp: Math.round(weatherObj.main.temp),
    tempMin: Math.round(weatherObj.main.temp_min),
    tempMax: Math.round(weatherObj.main.temp_max),
    wind: Math.round(weatherObj.wind.speed * 3.6),
    pressure: weatherObj.main.pressure,
    humidity: weatherObj.main.humidity,
    description: weatherObj.weather[0].description,
    icon: weatherObj.weather[0].icon
  };
  console.log(weatherInfo);
  console.log(weatherInfo.date)
  return weatherInfo;
}


export { getWeatherByCity, getWeatherByCoordinates, currentDate };

// HOW TO USE
/*
getWeatherByCity("Wroclaw").then((response) => {
    console.log(response);
})
getWeatherByCoordinates(51.1089776, 17.0326689).then((response) => {
    console.log(response);
})
*/