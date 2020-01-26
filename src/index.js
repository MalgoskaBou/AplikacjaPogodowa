import  isOnline from 'is-online';
import weatherByCoordinates from './scripts/geolocation';
import { getWeatherByCity } from './scripts/getCurrentWeather';
import { getForecastByCity } from './scripts/getForecast';
import { getData, renderCitiesList } from './scripts/dataSaveAndRead';
import {getCitesDb, findMatchingCities, renderMatchingCitiesList, changeActiveSuggestion} from './scripts/searchSuggestions';
import './styles/main.css';

require('./scripts/apikey');
let citiesDb;

async function weatherByGeolocation() {
	try {
		await weatherByCoordinates()
	  } catch (err) {
		console.log(err.message);
	  }
}

async function weatherByCity(e) {
	e.preventDefault();
	const city = e.target.querySelector('.form__search').value;
	try {
		await getWeatherByCity(city);
		await getForecastByCity(city);
	} catch (err) {
		console.log(err.message);
	}
}

async function weatherBySavedCity(e) {
	const city = e.target.innerText;
	try {
		await getWeatherByCity(city);
		await getForecastByCity(city);
	} catch (err) {
		console.log(err.message);
	}
}

async function displayMatchingCities (e) {
	const userInput = e.target.value;
	try {
		if (userInput.length && citiesDb) {
			const matchingCities = await findMatchingCities(userInput, citiesDb);
			renderMatchingCitiesList(matchingCities, userInput);
		} else {
			const cities = getData();
			renderCitiesList(cities);
		}
	} catch (err) {
		console.log(err.message);
	}
}

function displayCurrentCity () {
	const searchInput = document.querySelector('.form__search');
	if (!searchInput.value) {
		const cities = getData();
		searchInput.value = cities[0] || '';
	}
}

async function startApp() {
   	if (!(await isOnline())) {
		alert('No internet connection.');
	}
	citiesDb = await getCitesDb();
	const cities = getData();
	if (cities.length === 0) {
		await weatherByGeolocation();
	} else {
		await getWeatherByCity(cities[0]);
		await getForecastByCity(cities[0]);
		document.querySelector('.form__search').value = cities[0] || '';
	}
}

const searchForm = document.querySelector('.main__form');
const searchInput = document.querySelector('.form__search');
const savedCities = document.querySelector('.form__suggestions');
const geolocationButton = document.querySelector('.localization__findme-btn');

document.addEventListener('DOMContentLoaded', startApp);
geolocationButton.addEventListener('click', weatherByGeolocation);
searchForm.addEventListener('submit', weatherByCity);
searchInput.addEventListener('input', displayMatchingCities);
searchInput.addEventListener('keydown', changeActiveSuggestion);
savedCities.addEventListener('click', weatherBySavedCity);
searchInput.addEventListener('blur', displayCurrentCity);

