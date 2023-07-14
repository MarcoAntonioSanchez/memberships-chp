const promoImg = document.getElementById("promo-img");

document.addEventListener("DOMContentLoaded", function () {
    if (promoImg) {
        promoImg.innerHTML = ""
    } else {
        console.log("No existe elemento promo-img");
        return
    }
  });