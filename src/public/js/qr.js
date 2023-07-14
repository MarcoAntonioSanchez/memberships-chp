document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const memberParam = urlParams.get("member");
  const hiddenInput = document.getElementById("variableQR");
  hiddenInput.setAttribute("value", memberParam);
});
