window.addEventListener("scroll", function () {
  var navbar = document.querySelector(".navbar");

  if (window.scrollY > 0) {
    navbar.classList.add("navbar-shadow");
  } else {
    navbar.classList.remove("navbar-shadow");
  }
});
