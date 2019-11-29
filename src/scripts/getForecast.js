import getKey from './apikey';
import { currentDate } from './dataGet';

const key = getKey();
const url = "https://api.openweathermap.org/data/2.5/";


async function getForecastByCity(city) {
    const urlCity = `${url}forecast?q=${city}&units=metric&appid=${key}`;
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
        console.log(finalForecast);
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


export { getForecastByCity, getForecastByCoordinates }



// HOW TO USE

// getForecastByCity("Wroclaw").then((response) => {
//     console.log(response);
// })

// getForecastByCoordinates(51.1089776, 17.0326689).then((response) => {
//     console.log(response);
// })