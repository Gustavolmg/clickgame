import "./css/App.css";
import Sidebar from "./Sidebar";
import ClickCol from "./ClickCol";
import { useState } from "react";
function App() {
  const [ItemUpgrades] = useState(
    localStorage.getItem("itemUpgrades")
      ? JSON.parse(localStorage.getItem("itemUpgrades"))
      : null
  );
  if (ItemUpgrades != null && ItemUpgrades[0].sold == true) {
    var r = document.querySelector(":root");
    r.style.setProperty("--cursor-custom", "url('/mouse/Simple.png'), auto");
    r.style.setProperty(
      "--cursor-custom-hover",
      "url('/mouse/Simple.png'), auto"
    );
    r.style.setProperty(
      "--cursor-custom-click",
      "url('/mouse/Simple-click.png'), auto"
    );
  }
  return (
    <>
      <div className="gameBoard">
        <div className="clickCol">
          <ClickCol />
        </div>
        <div className="sidebar">
          <Sidebar />
        </div>
      </div>
    </>
  );
}

export default App;
