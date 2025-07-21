import { renderToString } from "react-dom/server";
import "./tooltip.css";
class Tooltip {
  constructor() {
    this.div = document.createElement("div");
  }

  addtooltip(name, price, description, production = "") {
    this.div.className = "tooltip";
    this.div.innerHTML = renderToString(
      <div className="tooltiptext-group half-border">
        <div className="f-6">{name}</div>
        <div className="f-4">
          Custo:{" "}
          {price.toLocaleString("pt-BR", {
            maximumFractionDigits: 0,
          })}
        </div>
      </div>
    );
    if (production != "") {
      this.div.innerHTML += renderToString(
        <div className="tooltiptext-group half-border">
          <div className="f-10">
            Gera: <text id="tooltipProductionIndicator">{production}</text>
            /Coração(ões) por segundo
          </div>
        </div>
      );
    }
    this.div.innerHTML += renderToString(
      <div className="tooltiptext-group">
        <div className="f-10">{description}</div>
      </div>
    );

    // Adiciona a div ao corpo do documento
    document.body.appendChild(this.div);
  }
  movetooltip() {
    document.addEventListener("mousemove", (e) => {
      this.div.style.top =
        e.screenY < 700 ? e.screenY - 110 + "px" : e.screenY - 200 + "px";
      switch (true) {
        case e.screenX < 910:
          this.div.style.left = "60%";
          break;
        case e.screenX < 1210 && e.screenX > 910:
          this.div.style.left = "33.7%";
          break;
        case e.screenX > 1210:
          this.div.style.left = "53.7%";
          break;
      }
    });
  }
  atttooltipProduction(production) {
    document.getElementById("tooltipProductionIndicator").innerHTML =
      production;
  }
  removetooltip() {
    document.body.removeChild(this.div);
  }
}

export default Tooltip;
