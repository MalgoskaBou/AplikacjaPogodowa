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

async function renderMatchingCitiesList (matchingCities, userInput) {
    const citiesList = document.querySelector('.form__suggestions');
    citiesList.innerHTML = "";
    const regex = new RegExp(userInput, 'gi');
    for (let i = 0; i < 8; i++) {
        if (matchingCities[i]) {
            const chars = matchingCities[i].replace(regex, `<span>${userInput}</span>`);
            const liEl = document.createElement('li');
        liEl.innerHTML = `<p class="form__city">${chars}</p>`;
        liEl.className = "form__list-item";
        citiesList.appendChild(liEl);
        }
    }
}

export {getCitesDb, findMatchingCities, renderMatchingCitiesList};