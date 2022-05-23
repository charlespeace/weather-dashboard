var weatherApiUrl = 'https://api.openweathermap.org'
var weatherApiKey = 'a9dc973acd420ee8d037c44741b54bf0'

var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var weatherContainer = document.querySelector('#weather');

function renderWeather(city, weather) {
    var tempF = weather.temp;
    var windMph = weather.wind_speed;
    var humidity = weather.humidity;

    var card = document.createElement('div');
    var cardBody = document.createElement('div');
    var heading = document.createElement('h2');
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p');

    card.setAttribute('class', 'card');
    cardBody.setAttribute('class', 'card-body');
    card.append(cardBody);

    heading.setAttribute('class', 'h3 card-title');
    tempEl.setAttribute('class', 'card-text');
    windEl.setAttribute('class', 'card-text');
    humidityEl.setAttribute('class', 'card-text');

    heading.textContent = `${city}`;
    tempEl.textContent = `Temperature: ${tempF}°F`;
    windEl.textContent = `Wind speed: ${windMph} MPH`;
    humidityEl.textContent = `Humidity percent: ${humidity} %`;
    cardBody.append(heading, tempEl, windEl, humidityEl);

    weatherContainer.innerHTML = '';
    weatherContainer.append(card);
    
}

function fetchWeather(location) {
    var { lat } = location;
    var { lon } = location;
    var city = location.name;
    var apiUrl = `${weatherApiUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`;
  
    fetch(apiUrl)
    .then(function (res) {
        return res.json();
    })
    .then(function(data) {
        renderWeather(city, data.current)
    })
    .catch(function (err) {
        console.error(err);
    });
}

function fetchCoords(search) {
    var apiUrl = `${weatherApiUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;
  
    fetch(apiUrl)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        if (!data[0]) {
            alert('Location not found');
        } else {
            fetchWeather(data[0]);
        }
    })
    .catch(function (err) {
        console.error(err);
    });
}

function submitSearchForm(e) {
    if (!searchInput.value) {
        alert('You need to enter a city')
      return;
    }
  
    e.preventDefault();
    var search = searchInput.value.trim();
    fetchCoords(search);
    searchInput.value = '';
}

searchForm.addEventListener('submit', submitSearchForm);