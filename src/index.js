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

let themeButton = document.querySelector(".theme");
themeButton.addEventListener("click", changeTheme);

const cities = [
  { id: "los-angeles", zone: "America/Los_Angeles" },
  { id: "sydney", zone: "Australia/Sydney" },
  { id: "tokyo", zone: "Asia/Tokyo" },
  { id: "paris", zone: "Europe/Paris" },
];

updateAllTimes();
setInterval(updateAllTimes, 1000);
