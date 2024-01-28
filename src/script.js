function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let city = document.querySelector("#city-title");
  city.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);

  let conditionElement = document.querySelector("#condition-description");
  conditionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#emoji");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="emoji" />`;

  timeElement.innerHTML = formatDate(date);
  getForecast(response.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "3bac60fa4at706da550d1a73eo81bb0f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function submitSearch(event) {
  event.preventDefault();
  let formInputElement = document.querySelector("#form-input");
  let formInputElementValue = formInputElement.value;

  searchCity(formInputElementValue);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "3bac60fa4at706da550d1a73eo81bb0f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        ` 
    <div class="weather-forecast-day">      
     <div class="weather-forecast-date">${formatDay(day.time)}</div>
     <div class="weather-forecast-icon">
      <img src="${day.condition.icon_url}" />
       </div>
     <div class="weather-forecast-temperatures">
     <span class="weather-forecast-temperature"> 
     <strong> ${Math.round(day.temperature.maximum)}°  </strong>
     </span>
     <span class="weather-forecast-temperature"> ${Math.round(
       day.temperature.minimum
     )}°  </span>
     </div>
     </div>
      `;
    }
  });
  let forecastElement = document.querySelector("#forecast");

  forecastElement.innerHTML = forecastHtml;
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submitSearch);
