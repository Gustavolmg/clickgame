import { renderToString } from "react-dom/server";
import "./modal.css";
class Modal {
  addModal(variavel) {
    let modal;
    document.getElementById("rootmodal").style.visibility = "visible";
    switch (variavel) {
      case 0:
        modal = renderToString(
          <div>
            {" "}
            <img className="imagem" src="/Textinhodoamor.png" />
          </div>
        );
        break;
      case 1:
        modal = renderToString(
          <div>
            <a
              href="https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ouça a playlist no Spotify
            </a>
          </div>
        );
        break;

      case 2:
        modal = renderToString(
          <div>
            <img
              width="500"
              height="700"
              className="imagem"
              src="https://static.vecteezy.com/ti/vetor-gratis/p1/16777477-pixel-rosa-vermelho-coracao-aleatorio-fundo-do-dia-dos-namorados-vetor.jpg"
            />
          </div>
        );
        break;
      case 3:
        modal = renderToString(<div>Video Aqui</div>);
        break;
    }
    document.getElementById("modalcontent").innerHTML = modal;
  }
}

export default Modal;
