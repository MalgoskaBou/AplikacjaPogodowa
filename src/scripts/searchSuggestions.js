async function getCitesDb() {
	const url =
		'https://raw.githubusercontent.com/dariaka/all-countries-and-cities-json/master/countries.json';
		return fetch(url)
		.then(response => response.json())
		.catch(err => console.log(err));
}

function findMatchingCities(cityToMatch, citiesDb) {
	const regex = new RegExp(cityToMatch, 'gi');
	const matches = [];
	for (let country in citiesDb) {
		citiesDb[country].map(city => {
			if (city.match(regex)) matches.push(city);
		});
	}
	return Array.from(new Set(matches)).sort();
}

async function renderMatchingCitiesList(matchingCities, userInput) {
	const citiesList = document.querySelector('.form__suggestions');
	citiesList.innerHTML = '';
	const regex = new RegExp(userInput, 'gi');
	for (let i = 0; i < 5; i++) {
		if (matchingCities[i]) {
			const chars = matchingCities[i].replace(
				regex,
				`<span>${userInput}</span>`
			);
			const liEl = document.createElement('li');
			liEl.innerHTML = `<p class="form__city">${chars}</p>`;
			liEl.className = 'form__list-item';
			citiesList.appendChild(liEl);
		}
	}
}

function changeActiveSuggestion (e) {
	if (e.keyCode !== 38 && e.keyCode !== 40) return;
	
	const listItems = document.querySelectorAll('.form__list-item');
	let activeId = -1;
	listItems.forEach((item, itemId) => {
		if (item.classList.contains('active')) activeId = itemId;
	});
	if (activeId > -1) listItems[activeId].classList.remove('active');

	if (e.keyCode === 40) {
		if (activeId >= listItems.length - 1) activeId = -1;
		listItems[activeId + 1].classList.add('active');
		document.querySelector('.form__search').value =
			listItems[activeId + 1].textContent;
	} else {
		if (activeId <= 0) activeId = listItems.length;
		listItems[activeId - 1].classList.add('active');
		document.querySelector('.form__search').value =
			listItems[activeId - 1].textContent;
	}
}

export {
	getCitesDb,
	findMatchingCities,
	renderMatchingCitiesList,
	changeActiveSuggestion,
};
