function updateAllTimes() {
  cities.forEach((city) => updateTime(city.id, city.zone));
}

function updateTime(id, timezone) {
  let city = document.querySelector(`#${id}`);
  if (city) {
    let cityTime = city.querySelector(".city-time");
    let cityDate = city.querySelector(".city-date");
    let time = moment().tz(timezone);
    cityTime.innerHTML = time.format("h:mm:ss A");
    cityDate.innerHTML = time.format("DD MMM YYYY");
  }
}

function changeTheme() {
  let updateTheme = document.querySelectorAll(".theme-target");
  for (let i = 0; i < updateTheme.length; i++) {
    updateTheme[i].classList.toggle("dark-theme");
  }
}

function changeToCity(event) {
  let timezone = event.target.value;
  let displayCity = document.querySelector("#content");
  if (timezone) {
    let cityDetails = cities.find((item) => item.zone === timezone);
    let cityId = cityDetails.id;
    let cityName = cityDetails.city;
    displayCity.innerHTML = `
      <div class="city-card theme-target dark-theme" id="${cityId}">
        <div class="city-clock">🕒</div>
        <div class="city-info theme-target dark-theme">
          ${cityName}
          <div class="city-time theme-target dark-theme"></div>
          <div class="city-date"></div>
        </div>
      </div>
      `;
    updateTime(cityId, timezone);
  } else {
    displayCity.innerHTML = `
      <div class="city-card theme-target dark-theme" id="los-angeles">
        <div class="city-clock">🕒</div>
        <div class="city-info theme-target dark-theme">
          Los Angeles
          <div class="city-time theme-target dark-theme"></div>
          <div class="city-date"></div>
        </div>
      </div>
      <div class="city-card theme-target dark-theme" id="sydney">
        <div class="city-clock">🕒</div>
        <div class="city-info theme-target dark-theme">
          Sydney
          <div class="city-time theme-target dark-theme"></div>
          <div class="city-date"></div>
        </div>
      </div>
      <div class="city-card theme-target dark-theme" id="tokyo">
        <div class="city-clock">🕒</div>
        <div class="city-info theme-target dark-theme">
          Tokyo
          <div class="city-time theme-target dark-theme"></div>
          <div class="city-date"></div>
        </div>
      </div>
      <div class="city-card theme-target dark-theme" id="paris">
        <div class="city-clock">🕒</div>
        <div class="city-info theme-target dark-theme">
          Paris
          <div class="city-time theme-target dark-theme"></div>
          <div class="city-date"></div>
        </div>
      </div>
    `;
    updateAllTimes();
  }
  let body = document.querySelector("body");
  if (!body.classList.contains("dark-theme")) {
    let elements = document.querySelectorAll(".dark-theme");
    elements.forEach((el) => el.classList.remove("dark-theme"));
  }
}

let themeButton = document.querySelector(".theme");
themeButton.addEventListener("click", changeTheme);

let citySelect = document.querySelector("#city-select");
citySelect.addEventListener("change", changeToCity);

const cities = [
  { id: "los-angeles", zone: "America/Los_Angeles", city: "Los Angeles" },
  { id: "sydney", zone: "Australia/Sydney", city: "Sydney" },
  { id: "tokyo", zone: "Asia/Tokyo", city: "Tokyo" },
  { id: "paris", zone: "Europe/Paris", city: "Paris" },
];

updateAllTimes();
setInterval(updateAllTimes, 1000);
