function updateWeather (object){
document.getElementById('bigTemp').innerHTML = object.temp;
document.getElementById('tempMin').innerHTML = object.min;
document.getElementById('tempMax').innerHTML = object.max ;
document.getElementById('condition').innerHTML = object.condition;
document.getElementById('wind').innerHTML = object.wind;
document.getElementById('pressure').innerHTML = object.pressure;
document.getElementById('humidity').innerHTML = object.humidity;
document.getElementById('icon').src = "imgs/icons/" + object.icon + ".svg";
document.getElementById('day1').innerHTML = object.day1;
document.getElementById('day2').innerHTML = object.day2;
document.getElementById('day3').innerHTML = object.day3;
document.getElementById('day4').innerHTML = object.day4;
document.getElementById('temp1').innerHTML = object.temp1;
document.getElementById('temp2').innerHTML = object.temp2;
document.getElementById('temp3').innerHTML = object.temp3;
document.getElementById('temp4').innerHTML = object.temp4;
document.getElementById('icon1').style.background = object.icon+'.svg';
document.getElementById('icon2').src = object.;
document.getElementById('icon3').src = object.;
document.getElementById('icon4').src = object.;
}