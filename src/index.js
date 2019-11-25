import './styles/main.css';
import {getWeatherByCity, getWeatherByCoordinates} from './scripts/meteoDataGet';

console.log('Hello from the main.js');

function weatherByCoordinates(e) {
    e.preventDefault();
    console.log('submit event')
}

function showCities() {
    console.log('input event')
}

function weatherByCity(e) {
    e.preventDefault();
    console.log('submit event')
}


const searchForm = document.querySelector('.form__search');

document.addEventListener('load', weatherByCoordinates);
searchForm.addEventListener('input', showCities);
searchForm.addEventListener('submit', weatherByCity);