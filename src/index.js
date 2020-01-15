import displayWeatherByCoordinates from './scripts/geolocation';
import { getWeatherByCity } from './scripts/getCurrentWeather';
import { getForecastByCity } from './scripts/getForecast';
import { getData, renderCitiesList, saveData } from './scripts/localStorage';
import {getCitesDb, findMatchingCities} from './scripts/searchSuggestions';
import './styles/main.css';

const isOnline = require('is-online');
let citiesDb;

require('./scripts/apikey');

async function weatherByCoordinates() {
	await displayWeatherByCoordinates();
	saveData();
	renderCitiesList();
}

async function weatherByCity(e) {
	e.preventDefault();
	const city = document.querySelector('.form__search').value;
	try {
		await getWeatherByCity(city);
		await getForecastByCity(city);
		document.querySelector('.form__search').value = getData()[0] || '';
	} catch (err) {
		alert(err.message);
	}
}

async function weatherBySavedCity(e) {
	const city = e.target.innerText;
	try {
		await getWeatherByCity(city);
		await getForecastByCity(city);
		document.querySelector('.form__search').value = getData()[0] || '';
	} catch (err) {
		alert(err.message);
	}
}

function displayMatchingCities (e) {
	const userInput = e.target.value;
	console.log(userInput);
	console.log(citiesDb);
	const matchingCities = findMatchingCities(userInput, citiesDb);
	console.log(matchingCities);
}

const moment = require('moment');
const currentTime = document.querySelector('.main__date');
(function timedUpdate() {
	currentTime.innerHTML = moment().format('Do MMMM YYYY, HH:mm');
	setTimeout(timedUpdate, 30000);
})();

async function startApp() {
   	if (!(await isOnline())) {
		alert('No internet connection.');
	}

	citiesDb = {...(await getCitesDb())};

	const cities = getData();
	if (cities.length === 0) {
		await weatherByCoordinates();
	} else {
		await getWeatherByCity(cities[0]);
		await getForecastByCity(cities[0]);
		renderCitiesList(cities);
		document.querySelector('.form__search').value = cities[0] || '';
	}
}

const searchForm = document.querySelector('.main__form');
const searchInput = document.querySelector('.form__search');
const savedCities = document.querySelector('.form__suggestions');
const geolocationButton = document.querySelector('.localization__findme-btn');


document.addEventListener('DOMContentLoaded', startApp);
geolocationButton.addEventListener('click', weatherByCoordinates);
searchForm.addEventListener('submit', weatherByCity);
searchInput.addEventListener('input', displayMatchingCities);
savedCities.addEventListener('click', weatherBySavedCity);

