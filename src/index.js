let cities = [
  { name: "New York", timezone: "America/New_York" },
  { name: "London", timezone: "Europe/London" },
  { name: "Tokyo", timezone: "Asia/Tokyo" },
  { name: "Sydney", timezone: "Australia/Sydney" },
];

function defaultClockCards() {
  let clockContainer = document.querySelector("#clocks-container");
  clockContainer.innerHTML = "";
  cities.forEach((city) => {
    let time = moment().tz(city.timezone).format("hh:mm:ss A");
    let date = moment().tz(city.timezone).format("DD MMMM YYYY");

    clockContainer.innerHTML += `
      <div class="col-md-6 mb-4">
        <div class="card shadow-lg border-0 rounded-4 bg-body h-100">
          <div class="card-body text-center">
            <h5 class="card-title fw-bold text-success mb-3">${city.name}</h5>
            <p class="display-6 mb-2">${time}</p>
            <p class="text-muted mb-0">${date}</p>
          </div>
        </div>
      </div>
    `;
  });
}

function fetchUserTime() {
  let userZone = moment.tz.guess();
  let userCity = userZone.split("/").pop().replace("_", " ");
  fetchCityInfo(userCity, userZone);
}

function fetchCityInfo(targetCity, zone) {
  clearInterval(defaultCitiesInterval);
  clearInterval(targetCityInterval);

  function updateClock() {
    let targetTime = moment().tz(zone).format("hh:mm:ss A");
    let targetDate = moment().tz(zone).format("DD MMMM YYYY");
    updateClockCard(targetCity, targetTime, targetDate);
  }

  updateClock();
  targetCityInterval = setInterval(updateClock, 1000);
}

function updateClockCard(city, time, date) {
  let clockContainer = document.querySelector("#clocks-container");
  clockContainer.innerHTML = "";
  clockContainer.innerHTML = `
      <div class="col-12 mb-4">
        <div class="card shadow-lg border-0 rounded-4 bg-body h-100">
          <div class="card-body text-center">
            <h5 class="card-title fw-bold text-success mb-3">${city}</h5>
            <p class="display-6 mb-2">${time}</p>
            <p class="text-muted">${date}</p>
          </div>
        </div>
      </div>
    `;
}

function errorClockCard(message) {
  clearInterval(targetCityInterval);
  clearInterval(defaultCitiesInterval);
  let clockContainer = document.querySelector("#clocks-container");
  clockContainer.innerHTML = "";
  clockContainer.innerHTML = `
      <div class="col-12 mb-4">
        <div class="card shadow-lg border-danger border-2 text-danger text-center p-4 rounded-4 bg-body h-100">
          <p class="mb-0 fw-semibold">${message}</p>
        </div>
      </div>
    `;
}

function toggleTheme() {
  let html = document.documentElement;
  let currentTheme = html.getAttribute("data-bs-theme");
  if (currentTheme === "dark") {
    html.setAttribute("data-bs-theme", "light");
  } else {
    html.setAttribute("data-bs-theme", "dark");
  }
}

function showDefault() {
  clearInterval(targetCityInterval);
  clearInterval(defaultCitiesInterval);

  defaultClockCards();
  defaultCitiesInterval = setInterval(defaultClockCards, 1000);
}

function getSearchInput(event) {
  if (event.key === "Enter") {
    let cityInput = event.target.value.trim();
    if (cityInput != "") {
      getInputTimezone(cityInput);
    }
  }
}

async function getInputTimezone(inputCity) {
  let url = `/.netlify/functions/geocode?city=${encodeURIComponent(inputCity)}`;
  try {
    let response = await fetch(url);
    let data = await response.json();

    if (data.results.length > 0) {
      let result = data.results[0];
      let identifiedZone = result.annotations.timezone.name;
      let cityName = result.formatted;
      fetchCityInfo(cityName, identifiedZone);
    } else {
      errorClockCard("City not found. Please try another.");
    }
  } catch (error) {
    console.error("Function error: ", error);
    errorClockCard("There was a problem contacting the server.");
  }
}

function eventListener() {
  let h1 = document.querySelector("h1");
  h1.addEventListener("click", showDefault);

  let localTimeButton = document.querySelectorAll(".local-time-button");
  localTimeButton.forEach((button) => {
    button.addEventListener("click", fetchUserTime);
  });

  let themeToggleButton = document.querySelector("#theme-toggle-button");
  themeToggleButton.addEventListener("click", toggleTheme);

  let searchInput = document.querySelectorAll(".search-input");
  searchInput.forEach((searchCity) => {
    searchCity.addEventListener("keydown", getSearchInput);
  });
}

let defaultCitiesInterval;
let targetCityInterval;
showDefault();
eventListener();
