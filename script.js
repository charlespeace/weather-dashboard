var weatherApiUrl = 'https://api.openweathermap.org'
var weatherApiKey = 'a9dc973acd420ee8d037c44741b54bf0'

var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');

function fetchWeather(location) {
    var { lat } = location;
    var { lon } = location;
    var apiUrl = `${weatherApiUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`;
  
    fetch(apiUrl)
    .then(function (res) {
        return res.json();
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
    var search = searchInput
    fetchCoords(search);
    searchInput.value = '';
}

searchForm.addEventListener('submit', submitSearchForm);