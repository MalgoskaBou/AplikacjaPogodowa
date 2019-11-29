function updateCurrentData(object) {
  document.querySelector(".form__search").value = `${object.city}`;
  document.querySelector('.form__search').blur();
  document.querySelector(".main__date").innerHTML = object.date;
  document.getElementById("bigTemp").innerHTML = object.temp;
  document.getElementById("tempMin").innerHTML = object.tempMin;
  document.getElementById("tempMax").innerHTML = object.tempMax;
  document.getElementById("condition").innerHTML = object.description;
  document.getElementById("wind").innerHTML = object.wind;
  document.getElementById("pressure").innerHTML = object.pressure;
  document.getElementById("humidity").innerHTML = object.humidity;
  document.getElementById("icon").style.backgroundImage = `url(assets/${object.icon}.svg)`;
}

function updateForecastData(object) {
  object.forEach((day, id) => {
    document.getElementById(`day${id+1}`).innerHTML = object[id].weekday;
    document.getElementById(`temp${id+1}`).innerHTML = object[id].temp;
    document.getElementById(`icon${id+1}`).style.backgroundImage = `url(assets/${object[id].icon}.svg)`;
  })
}

export { updateCurrentData, updateForecastData };