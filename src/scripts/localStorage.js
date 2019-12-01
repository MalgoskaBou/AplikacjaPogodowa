function renderCitiesList() {
    const citiesList = document.querySelector('.form__suggestions');
    const cities = getData();

    cities.forEach(city => {
        const liEl = document.createElement('li');
        liEl.innerHTML = `<p class="form__city">${city}</p>`;
        liEl.className = "form__list-item";
        citiesList.appendChild(liEl);
    })
}


function getData() {
    return (JSON.parse(localStorage.getItem('cities')) || []);
}

function saveData() {
    const cities = getData();
    const city = document.querySelector('.form__search').value;
    if (!city || cities.includes(city)) return;
    cities.unshift(city);
    if (cities.length > 3) cities.pop();
    localStorage.setItem('cities', JSON.stringify(cities));
}

export { getData, renderCitiesList, saveData};