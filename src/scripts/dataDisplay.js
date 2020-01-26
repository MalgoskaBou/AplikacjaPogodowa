import moment from 'moment';

function updateCurrentData(object) {
  document.querySelector(".form__search").value = object.city;
  document.querySelector('.form__search').blur();
  document.getElementById("bigTemp").innerHTML = object.temp;
  document.getElementById("tempMin").innerHTML = object.tempMin;
  document.getElementById("tempMax").innerHTML = object.tempMax;
  document.getElementById("condition").innerHTML = object.description;
  document.getElementById("wind").innerHTML = object.wind;
  document.getElementById("pressure").innerHTML = object.pressure;
  document.getElementById("humidity").innerHTML = object.humidity;
  $("#icon__big").load(`assets/${object.icon}.html`);
}

function updateForecastData(object) {
  object.forEach((day, id) => {
    document.getElementById(`day${id+1}`).innerHTML = object[id].weekday;
    document.getElementById(`temp${id+1}`).innerHTML = object[id].temp;
    $(`#icon${id+1}`).load(`assets/${object[id].icon}.html`);
  })
}

function updateTime(offsetInSec) {
  const currentTime = document.querySelector('.main__date');
  const offsetInMin = offsetInSec/60;
	currentTime.innerHTML = moment().utcOffset(offsetInMin).format('Do MMMM YYYY, HH:mm');
};

export {updateCurrentData, updateForecastData, updateTime};