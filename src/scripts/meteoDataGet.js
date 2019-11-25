import getKey from './apikey';
export {
    getWeatherByCity,
    getWeatherByCoordinates
};

const key = getKey();
const url = "https://api.openweathermap.org/data/2.5/";


async function getWeatherByCity(city) {
    const urlCity = `${url}weather?q=${city}&units=metric&appid=${key}`;
    try {
        const rawWeatherData = await fetch(urlCity);
        return rawWeatherData;
        // const finalWeather = mapToWeatherObj(rawWeatherData);
        // return finalWeather;
    } catch (err) {
        console.log(err);
    }
}

async function getWeatherByCoordinates(lat, lon) {
    let urlCity = `${url}weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
    try {
        const rawWeatherData = await fetch(urlCity);
        return rawWeatherData;
        // const finalWeather = mapToWeatherObj(rawWeatherData);
        // return finalWeather;
    } catch (err) {
        console.log(err);
    }
}