const api = {
  key: "12e5afacc6df931069c2ebeb8f04334e",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}




function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `High - ${Math.round(weather.main.temp_min)} °c / LOW - ${Math.round(weather.main.temp_max)}°c`;


  const icon = document.querySelector('.current .icon');

  if (weather_el.innerText === 'Clouds') {
    icon.innerHTML = '<img src="cloudy.svg">';
  } else if (weather_el.innerText === 'Clear') {
    icon.innerHTML = '<img src="day.svg">';
  } else if (weather_el.innerText === 'Rain') {
    icon.innerHTML = '<img src="rainy-6.svg">';
  } else if (weather_el.innerText === 'Mist') {
    icon.innerHTML = '<img src="snowy-1.svg">';
  } else {
    icon.innerHTML = '<img src="day.svg">';
  }

};


function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}