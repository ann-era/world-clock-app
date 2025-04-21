function changeTheme() {
  let updateTheme = document.querySelectorAll(".theme-target");
  for (let i = 0; i < updateTheme.length; i++) {
    updateTheme[i].classList.toggle("dark-theme");
  }
}

let themeButton = document.querySelector(".theme");
themeButton.addEventListener("click", changeTheme);

//los angeles
let losAngeles = document.querySelector("#los-angeles");
if (losAngeles) {
  let losAngelesTime = losAngeles.querySelector(".city-time");
  let losAngelesDate = losAngeles.querySelector(".city-date");
  let losAngelesTimeZone = moment().tz("America/Los_Angeles");
  losAngelesTime.innerHTML = losAngelesTimeZone.format("hh:mm A");
  losAngelesDate.innerHTML = losAngelesTimeZone.format("DD MMM YYYY");
}

//sydney
let sydney = document.querySelector("#sydney");
if (sydney) {
  let sydneyTime = sydney.querySelector(".city-time");
  let sydneyDate = sydney.querySelector(".city-date");
  let sydneyTimeZone = moment().tz("Australia/Sydney");
  sydneyTime.innerHTML = sydneyTimeZone.format("hh:mm A");
  sydneyDate.innerHTML = sydneyTimeZone.format("DD MMM YYYY");
}

//tokyo
let tokyo = document.querySelector("#tokyo");
if (tokyo) {
  let tokyoTime = tokyo.querySelector(".city-time");
  let tokyoDate = tokyo.querySelector(".city-date");
  let tokyoTimeZone = moment().tz("Asia/Tokyo");
  tokyoTime.innerHTML = tokyoTimeZone.format("hh:mm A");
  tokyoDate.innerHTML = tokyoTimeZone.format("DD MMM YYYY");
}

//paris
let paris = document.querySelector("#paris");
if (paris) {
  let parisTime = paris.querySelector(".city-time");
  let parisDate = paris.querySelector(".city-date");
  let parisTimeZone = moment().tz("Europe/Paris");
  parisTime.innerHTML = parisTimeZone.format("hh:mm A");
  parisDate.innerHTML = parisTimeZone.format("DD MMM YYYY");
}
