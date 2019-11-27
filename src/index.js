import getLocation from './scripts/geolocation.js';
import {
    getWeatherByCity,
    getWeatherByCoordinates
} from './scripts/dataGet.js';
import displayData from './scripts/dataDisplay.js';

import './styles/main.css';


function weatherByCoordinates() {
    async function getCoords() {
        const blob = await getLocation();
        if (typeof blob === String) {
            alert(blob);
            return;
        }
        return [blob[0], blob[1]];
    }

    getCoords()
        .then((coords) => getWeatherByCoordinates(...coords))
        .then(dataObj => displayData(dataObj))
        .catch(err => {
            console.log(err);
            alert('Upss.. Something went wrong!')
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
    }).catch(err => console.log(err));
}

const searchForm = document.querySelector('.main__form');

document.addEventListener('DOMContentLoaded', weatherByCoordinates);
searchForm.addEventListener('input', showCities);
searchForm.addEventListener('submit', weatherByCity);