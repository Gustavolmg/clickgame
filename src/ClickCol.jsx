import "./css/ClickCol.css";
import showFloatNumber from "./etc/floatNumber";
import { useEffect, useState } from "react";
import Pop from "./etc/popAudio";

function ClickCol() {
  const [storeAmount, setstoreAmount] = useState(
    localStorage.getItem("storeAmount")
      ? parseFloat(localStorage.getItem("storeAmount"))
      : () => {
          localStorage.setItem("storeAmount", 0);
          return 0;
        }
  );
  const [clickAmount, setclickAmount] = useState(
    localStorage.getItem("clickAmount")
      ? parseFloat(localStorage.getItem("clickAmount"))
      : () => {
          localStorage.setItem("clickAmount", 0);
          return 0;
        }
  );
  const [clickBaseValue, setclickBaseValue] = useState(
    localStorage.getItem("clickBaseValue")
      ? parseFloat(localStorage.getItem("clickBaseValue"))
      : () => {
          localStorage.setItem("clickBaseValue", 1);
          return 1;
        }
  );
  const [clickModifier, setclickModifier] = useState(
    localStorage.getItem("clickModifier")
      ? parseFloat(localStorage.getItem("clickModifier"))
      : () => {
          localStorage.setItem("clickModifier", 1);
          return 1;
        }
  );
  const [AmountPerSecond, setAmountPerSecond] = useState(
    localStorage.getItem("amountperSecond")
      ? parseFloat(localStorage.getItem("amountperSecond"))
      : () => {
          localStorage.setItem("amountperSecond", 0);
          return 0;
        }
  );

  const handleClick = () => {
    setclickAmount(clickAmount + clickBaseValue * clickModifier);
  };
  localStorage.setItem("clickAmount", parseInt(clickAmount));
  useEffect(() => {
    const timer = setInterval(() => {
      setstoreAmount(parseInt(localStorage.getItem("storeAmount")));
      setclickAmount(parseInt(localStorage.getItem("clickAmount")));
      setclickModifier(parseInt(localStorage.getItem("clickModifier")));
      setAmountPerSecond(parseInt(localStorage.getItem("amountperSecond")));
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <h2 className="heartIndicator">
        Corações:{" "}
        {(clickAmount + storeAmount).toLocaleString("pt-BR", {
          maximumFractionDigits: 0,
        })}
      </h2>
      <h2 className="heartIndicatorpersecond">
        Por Segundo:{" "}
        {AmountPerSecond.toLocaleString("pt-BR", {
          maximumFractionDigits: 0,
        })}
      </h2>
      <img
        className="clickImg"
        onClick={(c) => {
          Pop();
          handleClick();
          showFloatNumber(
            clickBaseValue * clickModifier,
            2000,
            c.pageX,
            c.pageY
          );
        }}
        src={"/heart.svg"}
        alt="Gerador de amor"
        draggable="false"
      />
    </>
  );
}

export default ClickCol;
