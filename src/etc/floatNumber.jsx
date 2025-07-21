import "./floatNumber.css";
function showFloatNumber(number, duration, positionx, positiony) {
  // Cria um novo elemento div
  const div = document.createElement("div");

  // Adiciona o número ao conteúdo da div
  div.textContent = "+" + number;

  div.className = "floatNumber";

  div.style.top = positiony - 5 + "px";
  div.style.left = positionx + "px";

  // Adiciona a div ao corpo do documento
  document.body.appendChild(div);

  // Remove a div após a duração especificada
  setTimeout(() => {
    div.style.top = positiony - 200 + "px";
    div.style.opacity = "0";
  }, 0);
  setTimeout(() => {
    document.body.removeChild(div);
  }, duration);
}
export default showFloatNumber;
