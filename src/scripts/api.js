const key = "8fcaab843005c41b8887ccbdd9eb6ace";
const url = "https://api.openweathermap.org/data/2.5/";

const getWeatherByCity = async (city) => {
    let urlCity = `${url}weather?q=${city}&units=metric&appid=${key}`;
    try {
        let response = await fetch(urlCity);
        return response.json();
    } catch(err) {
        console.log(err);
    }
}

console.log(getWeatherByCity("Wrocław"));

// Miasto
// Aktualna data
// Temperatura
// Temperatura minimalna / maksymalna
// Wiatr
// Ciśnienie
// Wilgotność
// Opis
// Ikona symboizująca aktualną pogodę

// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}