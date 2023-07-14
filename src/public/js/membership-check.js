document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const memberParam = urlParams.get("member");

  if (memberParam) {
    window.location.href = "/promos-cat/?member=" + memberParam;
  } else {
    return;
  }
});
