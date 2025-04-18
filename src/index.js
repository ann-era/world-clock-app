function changeTheme() {
  let updateTheme = document.querySelectorAll(".theme-target");
  for (let i = 0; i < updateTheme.length; i++) {
    updateTheme[i].classList.toggle("dark-theme");
  }
}

let themeButton = document.querySelector(".theme");
themeButton.addEventListener("click", changeTheme);
