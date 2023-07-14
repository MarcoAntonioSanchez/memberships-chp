// const = constante (tipo de variable)
// checkbox1 = Identificador de mi variable (nombre de mi constante)
// = | Asignar valor
// document = dentro de mi documento HTML
// getElementById = consigueme el elemento por su ID
// ("checkbox-wa") = input con ID checkbox-wa
const checkbox1 = document.getElementById("checkbox-wa");
const checkbox2 = document.getElementById("checkbox-tel");
const checkbox3 = document.getElementById("checkbox-email");
const resultadoInput = document.getElementById("checkbox-contact-means");

checkbox1.addEventListener("change", actualizarResultado);
checkbox2.addEventListener("change", actualizarResultado);
checkbox3.addEventListener("change", actualizarResultado);

function actualizarResultado() {
  let valoresSeleccionados = []; // Arreglo]

  if (checkbox1.checked) {
    valoresSeleccionados.push(checkbox1.value);
  }
  if (checkbox2.checked) {
    valoresSeleccionados.push(checkbox2.value);
  }
  if (checkbox3.checked) {
    valoresSeleccionados.push(checkbox3.value);
  }

  resultadoInput.setAttribute("value", [valoresSeleccionados].join(", "));
}

console.log(message);
