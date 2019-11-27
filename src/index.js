import getLocation from './scripts/geolocation.js';
import {
    getWeatherByCity,
    getWeatherByCoordinates
} from './scripts/dataGet.js';
import './styles/main.css';

async function weatherByCoordinates() {
    // console.log('onload event');
    // try {
    const coords = await getLocation();
    console.log(coords);
    // } catch (err) {
    //     console.log(err);
    // }

    // getWeatherByCoordinates(lat, lon).then((response) => {
    //     console.log(response)
    // })
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
    }).catch(err => console.log(err));
}

const searchForm = document.querySelector('.main__form');

document.addEventListener('DOMContentLoaded', weatherByCoordinates);
searchForm.addEventListener('input', showCities);
searchForm.addEventListener('submit', weatherByCity);