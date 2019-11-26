import getKey from './apikey.js';

const key = getKey();
const url = "https://api.openweathermap.org/data/2.5/";

const getWeatherByCity = async (city) => {
    let urlCity = `${url}weather?q=${city}&units=metric&appid=${key}`;
    try {
        let rawWeatherData = await fetch(urlCity);
        const finalWeather = mapToWeatherObj(rawWeatherData);
        return finalWeather;
    } catch(err) {
        console.log(err);
    }
}

const getWeatherByCoordinates = async (lat, lon) => {
    let urlCity = `${url}weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
    try {
        let rawWeatherData = await fetch(urlCity);
        const finalWeather = mapToWeatherObj(rawWeatherData);
        return finalWeather;
    } catch(err) {
        console.log(err);
    }
}

const mapToWeatherObj = async (rawWeatherData) => {
    const weatherObj = await rawWeatherData.json();

    const currentDate = () => {
        let a = new Date(weatherObj.dt * 1000);
        let year = a.getFullYear();
        let month = a.getMonth()+1;
        let day = a.getDate();
        let time = day + '-' + month + '-' + year;
        return time;
    }

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
    }

    return weatherInfo;
}

// HOW TO USE

getWeatherByCity("Wroclaw").then((response) => {
    console.log(response);
})
/*
getWeatherByCoordinates(51.1089776, 17.0326689).then((response) => {
    console.log(response);
})
*/