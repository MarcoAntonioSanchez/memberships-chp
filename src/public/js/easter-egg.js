document.addEventListener("DOMContentLoaded", function () {
  var clickCount = 0;
  var delay = 1000; // Tiempo de espera entre clicks en milisegundos
  var image = document.getElementById("footer-chiwawas-logo"); // Reemplaza 'miImagen' por el ID de tu imagen

  function handleImageClick() {
    clickCount++;
    if (clickCount === 3) {
      // Aquí redirige a la nueva página
      window.location.href = "/adm-login";
    }
  }

  image.addEventListener("click", function () {
    setTimeout(function () {
      clickCount = 0;
    }, delay);
    handleImageClick();
  });
});
