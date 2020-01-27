function getData() {
    return (JSON.parse(localStorage.getItem('cities')) || []);
}

function saveData(city) {
    let cities = getData();
    cities.unshift(city);
    cities = Array.from(new Set(cities));
    if (cities.length > 3) cities.pop();
    localStorage.setItem('cities', JSON.stringify(cities));
}

function renderCitiesList() {
    const citiesList = document.querySelector('.form__suggestions');
    citiesList.innerHTML = "";
    const cities = getData();
    cities.map(city => {
        const liEl = document.createElement('li');
        liEl.innerHTML = `<p class="form__city">${city}</p>`;
        liEl.className = "form__list-item";
        citiesList.appendChild(liEl);
    })
}

export { getData, saveData, renderCitiesList };