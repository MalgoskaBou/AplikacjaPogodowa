import getKey from './apikey.js';

const key = getKey();
const url = "https://api.openweathermap.org/data/2.5/";


const getForecastByCity = async (city) => {
    let urlCity = `${url}forecast?q=${city}&units=metric&appid=${key}`;
    try {
        let rawForecastData = await fetch(urlCity);
        const finalForecast = mapToForecastObj(rawForecastData);
        return finalForecast;
    } catch(err) {
        console.log(err);
    }
}

const getForecastByCoordinates = async (lat, lon) => {
    let urlCity = `${url}forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
    try {
        let rawForecastData = await fetch(urlCity);
        const finalForecast = mapToForecastObj(rawForecastData);
        return finalForecast;
    } catch(err) {
        console.log(err);
    }
}

const mapToForecastObj = async (rawForecastData) => {
    const forecastObj = await rawForecastData.json();

    const currentDate = () => {
        let a = new Date(Date.now());
        let year = a.getFullYear();
        let month = a.getMonth()+1;
        let day = a.getDate();
        let time = year + '-' + month + '-' + day;
        return time;
    }

    const timestamps = forecastObj.list;
    var forecast = [];

    for (const timestamp of timestamps) {
        if (timestamp.dt_txt.includes("12:00") === true && timestamp.dt_txt.includes(currentDate()) === false) {
            let options = { weekday: 'short' };
            let weekday  = new Date(timestamp.dt * 1000);

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



// HOW TO USE

// getForecastByCity("Wroclaw").then((response) => {
//     console.log(response);
// })

// getForecastByCoordinates(51.1089776, 17.0326689).then((response) => {
//     console.log(response);
// })


