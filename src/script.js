function submitSearch(event) {
  event.preventDefault();
  let formInputElement = document.querySelector("#form-input");
  let formInputElementValue = formInputElement.value;
  let city = document.querySelector("#city-title");
  city.innerHTML = formInputElementValue;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submitSearch);
