const api = {
    key: "9b17b4a7b49df4cf14903e89bc92eb16",
    base: "api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=9b17b4a7b49df4cf14903e89bc92eb16"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery)

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults (query) {
    fetch(`${api.base}weather?=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerTEXT = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerTEXT = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerTEXT = `${Math.round(weather.main.temp)}<span>*c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerTEXT = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerTEXT = `${Math.round(weather.main.temp_min)}*c / ${Math.round(weather.main.temp_max)}*c`;
}

function dateBuilder() {
    let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}


