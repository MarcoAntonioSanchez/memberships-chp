document.addEventListener("DOMContentLoaded", function () {
  const statusFields = document.querySelectorAll("#promo-status-td");
  for (let i = 0; i < statusFields.length; i++) {
    statusFields[i].innerText = statusFields[i].innerText.trim();
    if (statusFields[i].innerText === "1") {
      statusFields[i].innerText = "Activa";
    } else if (statusFields[i].innerText === "0") {
      statusFields[i].innerText = "Inactiva";
    }
  }
});
