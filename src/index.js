let localTimeInterval = null;

const cities = [
  { id: "los-angeles", zone: "America/Los_Angeles", city: "Los Angeles" },
  { id: "sydney", zone: "Australia/Sydney", city: "Sydney" },
  { id: "tokyo", zone: "Asia/Tokyo", city: "Tokyo" },
  { id: "paris", zone: "Europe/Paris", city: "Paris" },
];

function generateCityCard(id, cityName, time = "", date = "") {
  return `
    <div class="city-card theme-target dark-theme" id="${id}">
      <div class="city-clock">🕒</div>
      <div class="city-info theme-target dark-theme">
        ${cityName}
        <div class="city-time theme-target dark-theme">${time}</div>
        <div class="city-date">${date}</div>
      </div>
    </div>
  `;
}

function updateCityDisplay(zone, id) {
  const city = document.querySelector(`#${id}`);
  if (city) {
    const cityTime = city.querySelector(".city-time");
    const cityDate = city.querySelector(".city-date");
    const now = moment().tz(zone);
    cityTime.innerText = now.format("h:mm:ss A");
    cityDate.innerText = now.format("DD MMM YYYY");
  }
}

function updateAllTimes() {
  cities.forEach((city) => updateCityDisplay(city.zone, city.id));
}

function renderDefaultCities() {
  const displayCity = document.querySelector("#content");
  displayCity.innerHTML = "";

  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    const now = moment().tz(city.zone);
    const time = now.format("h:mm:ss A");
    const date = now.format("DD MMM YYYY");
    const cityCard = generateCityCard(city.id, city.city, time, date);
    displayCity.innerHTML += cityCard;
  }

  updateAllTimes();
}

function updateLocalTimeDisplay() {
  const now = moment();
  const localZone = moment.tz.guess();
  const localCity = localZone.split("/").pop().replace("_", " ");
  const time = now.tz(localZone).format("h:mm:ss A");
  const date = now.tz(localZone).format("DD MMM YYYY");

  const displayCity = document.querySelector("#content");
  displayCity.innerHTML = generateCityCard("local", localCity, time, date);

  checkThemeSetting();
}

function changeToCity(event) {
  const timezone = event.target.value;
  const displayCity = document.querySelector("#content");

  clearInterval(localTimeInterval);

  if (timezone && timezone !== "local") {
    const cityDetails = cities.find((item) => item.zone === timezone);
    const cityId = cityDetails.id;
    const cityName = cityDetails.city;
    const now = moment().tz(timezone);

    displayCity.innerHTML = generateCityCard(
      cityId,
      cityName,
      now.format("h:mm:ss A"),
      now.format("DD MMM YYYY")
    );

    updateCityDisplay(timezone, cityId);
  } else if (timezone === "local") {
    updateLocalTimeDisplay();
    localTimeInterval = setInterval(updateLocalTimeDisplay, 1000);
  } else {
    renderDefaultCities();
  }

  checkThemeSetting();
}

function checkThemeSetting() {
  let body = document.querySelector("body");
  if (!body.classList.contains("dark-theme")) {
    let elements = document.querySelectorAll(".dark-theme");
    elements.forEach((el) => el.classList.remove("dark-theme"));
  }
}

function changeTheme() {
  let updateTheme = document.querySelectorAll(".theme-target");
  updateTheme.forEach((el) => el.classList.toggle("dark-theme"));
}

// Event Listeners
document.querySelector(".theme").addEventListener("click", changeTheme);
document.querySelector("#city-select").addEventListener("change", changeToCity);

// Initial load
renderDefaultCities();
setInterval(updateAllTimes, 1000);
