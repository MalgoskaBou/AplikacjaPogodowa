import getLocation from './scripts/geolocation.js';
import {
    getWeatherByCity,
    getWeatherByCoordinates
} from './scripts/dataGet.js';
import displayData from './scripts/dataDisplay.js';

import './styles/main.css';


/*
// druga wersja funkcji:
async function weatherByCoordinates() {
    async function getCoords() {
        try {
            const blob = await getLocation();
            console.log(blob);
            if (typeof blob === String) {
                console.log(blob);
                alert(blob);
            } else {
                console.log("po else:");
                console.log(blob); //tu jeszcze obiekt ze współrzędnymi
                console.log(blob.geoLat + " | " + blob.geoLng); //tu już undefined
                const lat = blob.geoLat;
                const long = blob.geoLng;
            }
        } catch {
            (err) => console.log(err)
        }
    }

    getCoords()
        .then((coords) => getWeatherByCoordinates(...coords))
        .then((dataObj) => displayData(dataObj))
        .catch((err) => {
            console.log(err);
            alert('Upss.. Something went wrong!')
        })
}
*/


// pierwsza wersja:
async function weatherByCoordinates() {
    console.log('onload event');
    try {
        const coords = await getLocation();
        console.log(coords);
    } catch (err) {
        console.log(err);
    }
}

function showCities() {
    console.log('input event');
}

async function weatherByCity(e) {
    e.preventDefault();
    const city = document.querySelector('.form__search').value;
    console.log(city);
    getWeatherByCity(city)
        .then((dataObj) => displayData(dataObj))
        .catch(err => console.log(err));
}

const searchForm = document.querySelector('.main__form');

document.addEventListener('DOMContentLoaded', weatherByCoordinates);
searchForm.addEventListener('input', showCities);
searchForm.addEventListener('submit', weatherByCity);