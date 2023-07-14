const promoStatusInput = document.getElementById("activeInput");
const onButton = document.getElementById("active-btn-on");
const offButton = document.getElementById("active-btn-off");
const membershipTypebtn = document.getElementById("memberTypeBtn");

const vipOpt = document.getElementById("vipSelectOpt");
const preferenteOpt = document.getElementById("preferenteSelectOpt");

if (promoStatusInput.value == 0) {
  onButton.classList.remove("btn-dark");
  onButton.classList.add("btn-light");
  offButton.classList.remove("btn-light");
  offButton.classList.add("btn-dark");
} else {
  offButton.classList.remove("btn-dark");
  offButton.classList.add("btn-light");
  onButton.classList.remove("btn-light");
  onButton.classList.add("btn-dark");
}

if (membershipTypebtn.value == "VIP") {
  vipOpt.selected = true;
  preferenteOpt.selected = false;
} else {
  preferenteOpt.selected = true;
  vipOpt.selected = false;
}

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
