import getKey from './apikey';
import {updateForecastData} from "./dataDisplay";
// import { currentDate } from './dataGet';

const key = getKey();
const url = "https://api.openweathermap.org/data/2.5/";


async function getForecastByCity(city) {
    const urlCity = `${url}forecast?q=${city}&units=metric&appid=${key}`;
    fetch(urlCity)
    .then(response => {
        if (response.ok) {
            return mapToForecastObj(response);
        } else {
            throw new Error(response.status);
        }
    })
    .then(forecastData => updateForecastData(forecastData))
    .catch (err =>{
        if (err.message == 404) {
            console.log("Sorry, we couldn't find forecast data for your city.");
        } else if (err.message == 401) {
            console.log("Sorry, your API key is not correct.");
        } else {
            console.log("An unknown error occurred.");
        }
    })      
}


async function getForecastByCoordinates(lat, lon) {
    let urlCity = `${url}forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
    try {
        const rawForecastData = await fetch(urlCity).then(response => {
            if (response.status != 200) {
              throw response.status;
            }
            return response;
        });
        const finalForecast = mapToForecastObj(rawForecastData);
        return finalForecast;
    } catch (err) {
        console.log(err);
    }
}


async function mapToForecastObj(rawForecastData) {
    const forecastObj = await rawForecastData.json();

    const timestamps = forecastObj.list;
    const forecast = [];

    for (const timestamp of timestamps) {
        if (timestamp.dt_txt.includes("12:00") === true && timestamp.dt_txt.includes(currentDate()) === false) {
            const options = {
                weekday: 'short'
            };
            const weekday = new Date(timestamp.dt * 1000);

            forecast.push({
                temp: Math.round(timestamp.main.temp_max),
                icon: timestamp.weather[0].icon,
                weekday: weekday.toLocaleDateString("en-US", options)
            });
        }
    }
    if (forecast.length > 4) {
        forecast.pop();
    }
    return forecast;
}

function currentDate () {
  const a = new Date(Date.now());
  const year = a.getFullYear();
  const month = a.getMonth() + 1;
  const day = a.getDate();
  const time = year + '-' + month + '-' + day;
  return time;
};


export { getForecastByCity, getForecastByCoordinates };