async function getCitesDb () {
	const url ='https://raw.githubusercontent.com/dariaka/all-countries-and-cities-json/master/countries.json';
    const citiesDb = await fetch(url)
		.then(response => response.json())
		.then(data => {return {...data}})
        .catch(err => console.log(err));
    return citiesDb;
};

function findMatchingCities (cityToMatch, citiesDb) {
    const regex = new RegExp(cityToMatch, 'gi');
    const matches = [];
    for (let country in citiesDb) {
        citiesDb[country].map(city => {
            if (city.match(regex)) matches.push(city);
        })
    }
    return Array.from(new Set(matches)).sort();
}

async function renderMatchingCitiesList (matchingCities) {
    const citiesList = document.querySelector('.form__suggestions');
    citiesList.innerHTML = "";
    for (let i = 0; i < 8; i++) {
        if (matchingCities[i]) {
            const liEl = document.createElement('li');
        liEl.innerHTML = `<p class="form__city">${matchingCities[i]}</p>`;
        liEl.className = "form__list-item";
        citiesList.appendChild(liEl);
        }
    }
}

export {getCitesDb, findMatchingCities, renderMatchingCitiesList};