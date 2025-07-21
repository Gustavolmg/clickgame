import React, { useState } from "react";
import "./css/Sidebar.css";

import useInterval from "./etc/useInterval";
import * as itemsjson from "./items.json";
import ItemCell from "./ItemCell";
const itemsArray = Object.values(itemsjson["itemStore"]);

function Sidebar() {
  const [ItemStore, setItemStore] = useState(
    localStorage.getItem("itemStore")
      ? JSON.parse(localStorage.getItem("itemStore"))
      : () => {
          localStorage.setItem("itemStore", JSON.stringify(itemsArray));
          return itemsArray;
        }
  );
  const storeCal = () => {
    let Amount = 0;
    ItemStore.map((items) => {
      if (items.level > 0) {
        Amount += items.production * items.productionModifier;
      }
    });
    localStorage.setItem("amountperSecond", Amount);
    localStorage.getItem("storeAmount")
      ? localStorage.setItem(
          "storeAmount",
          parseFloat(localStorage.getItem("storeAmount")) + Amount
        )
      : localStorage.setItem("storeAmount", Amount);
    setItemStore(JSON.parse(localStorage.getItem("itemStore")));
  };

  useInterval(() => {
    storeCal();
  }, 1000);
  return (
    <>
      <div className="title">
        <div className="title-items f-33">Loja</div>
        <div className="title-items f-33">Atualizações</div>
        <div className="title-items f-33">Recompensas</div>
      </div>
      <div className="items-content">
        <div className="items-col f-33">
          <ItemCell cell="store" />
        </div>
        <div className="items-col f-33">
          <ItemCell cell="upgrades" />
        </div>
        <div className="items-col f-33">
          <ItemCell cell="rewards" />
        </div>
      </div>
      <div className="modal" style={{ visibility: "hidden" }} id="rootmodal">
        <div
          className="overlay "
          onClick={() => {
            document.getElementById("rootmodal").style.visibility = "hidden";
            document.getElementById("modalcontent").innerHTML = "";
          }}
        ></div>
        <div className="modal-content">
          <div id="modalcontent"></div>
          <button
            className="close-modal"
            onClick={() => {
              document.getElementById("rootmodal").style.visibility = "hidden";
              document.getElementById("modalcontent").innerHTML = "";
            }}
          >
            fechar
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
