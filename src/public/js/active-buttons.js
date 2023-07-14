const onButton = document.getElementById("active-btn-on");
const offButton = document.getElementById("active-btn-off");
const activeInput = document.getElementById("activeInput");

onButton.addEventListener("click", function () {
  activeInput.setAttribute("value", "1");
  onButton.classList.remove("btn-light");
  onButton.classList.add("btn-dark");
  offButton.classList.remove("btn-dark");
  offButton.classList.add("btn-light");
});

offButton.addEventListener("click", function () {
  activeInput.setAttribute("value", "0");
  offButton.classList.remove("btn-light");
  offButton.classList.add("btn-dark");
  onButton.classList.remove("btn-dark");
  onButton.classList.add("btn-light");
});
