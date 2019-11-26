import getLocation from './scripts/geolocation';
import {
    getWeatherByCity,
    getWeatherByCoordinates
} from './scripts/dataGet';
import './styles/main.css';

async function weatherByCoordinates() {
    console.log('onload event');
    const lat = await getLocation()[0];
    const lon = await getLocation()[1];
    console.log(lat, lon);
    getWeatherByCoordinates(lat, lon).then((response) => {
        console.log(response)
    })
}

function showCities() {
    console.log('input event');
}

function weatherByCity(e) {
    e.preventDefault();
    const city = document.querySelector('.form__search').value;
    console.log(city);
    getWeatherByCity(city).then(response => {
        console.log(response)
    });
}

const searchForm = document.querySelector('.main__form');

document.addEventListener('DOMContentLoaded', weatherByCoordinates);
searchForm.addEventListener('input', showCities);
searchForm.addEventListener('submit', weatherByCity);