const qrInput = document.getElementById("setMemberQr");

const urlParams = new URLSearchParams(window.location.search);
const memberParam = urlParams.get("member");

qrInput.setAttribute("value", memberParam);
