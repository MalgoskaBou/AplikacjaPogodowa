import {updateForecastData} from "./dataDisplay";

const key = process.env.API_KEY;
const url = "https://api.openweathermap.org/data/2.5/";


async function getForecastByCity(city) {
    const urlCity = `${url}forecast?q=${city}&units=metric&appid=${key}`;
    fetch(urlCity)
    .then(response => {
        if (!response.ok) throw new Error(response.status);
        return mapToForecastObj(response);
    })
    .then(forecastData => updateForecastData(forecastData))
    .catch(err => console.log(err));
}


async function getForecastByCoordinates(lat, lon) {
    let urlCity = `${url}forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
    fetch(urlCity)
    .then(response => {
        if (!response.ok) throw new Error(response.status);
        return mapToForecastObj(response);
    })
    .then(forecastData => updateForecastData(forecastData))
    .catch(err => console.log(err));
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