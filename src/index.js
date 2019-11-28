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
            if (typeof blob !== Array) {
                console.log(blob);
                alert(blob);
            } else {
                console.log("po else:");
                console.log(blob); //tu jeszcze tablica ze współrzędnymi
                console.log(blob[0] + " | " + blob[1]); //tu już undefined
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
        console.log(coords); // zwraca tablicę ze współrzędnymi
        console.log(coords[0]); // zwraca undefined
        console.log(Array.isArray(coords)); // true
        console.log(coords.length); // 0
        console.log(coords); // zwraca tablicę ze współrzędnymi
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