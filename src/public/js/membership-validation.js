const urlParams = new URLSearchParams(window.location.search);
const memberParam = urlParams.get("member");
const spanTag = document.getElementById("membership-id");

spanTag.innerText = memberParam;
