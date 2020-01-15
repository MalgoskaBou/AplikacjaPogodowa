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
    return new Set(matches);
}



export {getCitesDb, findMatchingCities};