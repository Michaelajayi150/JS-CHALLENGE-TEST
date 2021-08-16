const api = {
    key: "c38e1044787113bd01a4f94aaa2bb031",
    baseUrl: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener('keypress', setApi);
window.addEventListener('load', function() {
    getResults('Lagos');
})

function setApi(event) {
    if (event.keyCode == 13) {
        getResults(searchBox.value);
    }
}

function getResults(query) {
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
    //Degree Symbol
    var degreeValue = '\u00B0' + "c";

    // Set City
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    // Set Date 
    let date = document.querySelector('.location .date');
    let now = new Date();
    date.innerText = dateBuilder(now);

    //Set Temp.
    let temp = document.querySelector('.current .temp');
    temp.innerText = `${Math.floor(weather.main.temp)}` + " " + degreeValue;

    //Set Weather
    let weatherType = document.querySelector('.current .weather');
    weatherType.innerText = weather.weather[0].main;

    //Set Hi/Low 
    let hiLow = document.querySelector('.current .hi-low');
    hiLow.innerText = `${Math.floor(weather.main.temp_min)}` + degreeValue + " / " + `${Math.floor(weather.main.temp_max)}` + degreeValue ;

    //Check If Min Temp and Max Temp are the same
    if (`${Math.floor(weather.main.temp_min)}` === `${Math.floor(weather.main.temp_max)}`) {
        hiLow.innerText = `${Math.floor(weather.main.temp_min)}` + degreeValue;
    }
}

function dateBuilder(d) {
    var days = [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ]
    var months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]

    let day = days[d.getDay()],
        date = d.getDate(),
        month = months[d.getMonth()],
        year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}