const key = "8fcaab843005c41b8887ccbdd9eb6ace";
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
        temp: `${Math.round(weatherObj.main.temp)}°C`,
        tempMin: `${Math.round(weatherObj.main.temp_min)}°C`,
        tempMax: `${Math.round(weatherObj.main.temp_max)}°C`,
        wind: weatherObj.wind.speed + " m/s",
        pressure: weatherObj.main.pressure + " hPa",
        humidity: weatherObj.main.humidity + "%",
        description: weatherObj.weather[0].description,
        icon: weatherObj.weather[0].icon
    }

    return weatherInfo;
}