import { useState } from "react";
import "./css/ItemCell.css";
import Tooltip from "./etc/tooltip";
import * as itemsjson from "./items.json";
import useInterval from "./etc/useInterval";
import Modal from "./etc/modal";
const BaseItemStore = Object.values(itemsjson["itemStore"]);
const BaseItemUpgrades = Object.values(itemsjson["itemUpgrades"]);
const BaseItemRewards = Object.values(itemsjson["Rewards"]);
const tooltip = new Tooltip();
const modal = new Modal();
export default function ItemCell({ cell }) {
  const [ItemStore, setItemStore] = useState(
    localStorage.getItem("itemStore")
      ? JSON.parse(localStorage.getItem("itemStore"))
      : () => {
          localStorage.setItem("itemStore", JSON.stringify(BaseItemStore));
          return BaseItemStore;
        }
  );
  const [ItemUpgrades, setItemUpgrades] = useState(
    localStorage.getItem("itemUpgrades")
      ? JSON.parse(localStorage.getItem("itemUpgrades"))
      : () => {
          localStorage.setItem(
            "itemUpgrades",
            JSON.stringify(BaseItemUpgrades)
          );
          return BaseItemUpgrades;
        }
  );
  const [ItemRewards, setItemRewards] = useState(
    localStorage.getItem("ItemRewards")
      ? JSON.parse(localStorage.getItem("ItemRewards"))
      : () => {
          localStorage.setItem("ItemRewards", JSON.stringify(BaseItemRewards));
          return BaseItemRewards;
        }
  );
  function changeItemUpgrades(itemUpgrades = null) {
    if (itemUpgrades != null) {
      localStorage.setItem("itemUpgrades", JSON.stringify(itemUpgrades));
    }
    setItemUpgrades(JSON.parse(localStorage.getItem("itemUpgrades")));
  }
  function changeItemStore(itemStore = null) {
    if (itemStore != null) {
      localStorage.setItem("itemStore", JSON.stringify(itemStore));
    }
    setItemStore(JSON.parse(localStorage.getItem("itemStore")));
  }
  function changeAmount(amount) {
    localStorage.setItem("clickAmount", 0);
    localStorage.setItem("storeAmount", amount);
  }
  function buyItem(id, list) {
    let clickAmount =
      parseInt(localStorage.getItem("clickAmount")) +
      parseInt(localStorage.getItem("storeAmount"));
    switch (list) {
      case "store":
        if (clickAmount >= ItemStore[id].price) {
          changeAmount(clickAmount - ItemStore[id].price);

          ItemStore[id].level += 1;
          ItemStore[id].price = Math.ceil(
            parseFloat(ItemStore[id].price) * 1.15
          );
          ItemStore[id].production = parseInt(
            parseInt(ItemStore[id].level) *
              parseInt(BaseItemStore[id].production)
          );
          changeItemStore(ItemStore);
        }
        break;
      case "upgrades":
        if (
          ItemUpgrades[id].effectTo == "click" &&
          ItemUpgrades[id].sold == false &&
          clickAmount >= ItemUpgrades[id].price
        ) {
          localStorage.setItem(
            "clickModifier",
            parseInt(localStorage.getItem("clickModifier")) *
              ItemUpgrades[id].effect
          );

          ItemUpgrades[id].sold = true;

          changeAmount(clickAmount - ItemUpgrades[id].price);
          changeItemUpgrades(ItemUpgrades);
          window.location.reload();
        } else if (
          clickAmount >= ItemUpgrades[id].price &&
          ItemUpgrades[id].sold == false
        ) {
          ItemStore[ItemUpgrades[id].effectTo].productionModifier =
            ItemStore[ItemUpgrades[id].effectTo].productionModifier *
            ItemUpgrades[id].effect;
          ItemUpgrades[id].sold = true;

          changeAmount(clickAmount - ItemUpgrades[id].price);
          changeItemUpgrades(ItemUpgrades);
          changeItemStore(ItemStore);
        }
        break;
      case "rewards":
        if (clickAmount > ItemRewards[id].price) {
          changeAmount(clickAmount - ItemRewards[id].price);
          ItemRewards[id].sold = true;
          localStorage.setItem("ItemRewards", JSON.stringify(ItemRewards));
          setItemRewards(JSON.parse(localStorage.getItem("ItemRewards")));
        }
        break;
    }
  }
  function ItemCellStore() {
    return (
      <div className="items">
        {ItemStore.map((items, index) => {
          if (
            (ItemStore[index - 1] != null && ItemStore[index - 1].level > 0) ||
            index == 0
          ) {
            return (
              <button
                className="buttonCell"
                onMouseMove={() => {
                  tooltip.atttooltipProduction(
                    items.production * items.productionModifier
                  );
                }}
                onMouseEnter={() => {
                  tooltip.addtooltip(
                    items.name,
                    items.price,
                    items.description,
                    items.production * items.productionModifier
                  );
                }}
                onMouseOver={() => {
                  tooltip.movetooltip();
                }}
                onMouseLeave={() => {
                  tooltip.removetooltip();
                }}
                onClick={() => {
                  tooltip.atttooltipProduction(
                    items.production * items.productionModifier
                  );
                  buyItem(index, "store");
                }}
                key={index}
              >
                <img
                  className="itemImage f-1"
                  src={`./${items.img}.png`}
                  alt={items.name}
                />
                <div className="itemInfo f-7">
                  <div className="itemName">{items.name}</div>
                  <div className="itemPrice">
                    {items.price.toLocaleString("pt-BR", {
                      maximumFractionDigits: 0,
                    })}{" "}
                    C
                  </div>
                </div>
                <div className="itemLevel f-2">{items.level}</div>
              </button>
            );
          }
        })}
      </div>
    );
  }
  function ItemCellUpgrades() {
    return (
      <div className="items">
        {ItemUpgrades.map((items, index) => {
          if (
            items.requirement == "click" ||
            ItemStore[items.requirement].level >= items.requirementLevel
          ) {
            return (
              <button
                className={items.sold ? "buttonCell sold" : "buttonCell"}
                onMouseEnter={() => {
                  tooltip.addtooltip(
                    items.name,
                    items.price,
                    items.description
                  );
                }}
                onMouseLeave={() => {
                  tooltip.removetooltip();
                }}
                onMouseOver={() => {
                  tooltip.movetooltip();
                }}
                onClick={() => {
                  buyItem(index, "upgrades");
                }}
                key={index}
              >
                <img
                  className="itemImage f-1"
                  src={`./${items.img}.png`}
                  alt={items.name}
                />
                <div className="itemInfo f-5">
                  <div className="itemName">{items.name}</div>
                  <div className="itemPrice">
                    {items.price.toLocaleString("pt-BR", {
                      maximumFractionDigits: 0,
                    })}{" "}
                    C
                  </div>
                </div>
                <div className="itemStatus f-4">
                  {items.sold ? "Adquirido" : "Disponivel"}
                </div>
              </button>
            );
          }
        })}
      </div>
    );
  }
  function ItemCellRewards() {
    return (
      <>
        {ItemRewards.map((items, index) => {
          return (
            <button
              className={items.sold ? "buttonCell sold" : "buttonCell"}
              onMouseEnter={() => {
                tooltip.addtooltip(items.name, items.price, items.description);
              }}
              onMouseLeave={() => {
                tooltip.removetooltip();
              }}
              onMouseOver={() => {
                tooltip.movetooltip();
              }}
              onClick={() => {
                items.sold ? modal.addModal(index) : buyItem(index, "rewards");
              }}
              key={index}
            >
              <div className="f-1">
                <img
                  className="itemImage "
                  src={`./${items.img}.png`}
                  alt={items.name}
                />
              </div>
              <div className="itemInfo f-7">
                <div className="itemName">{items.name}</div>
                <div className="itemPrice">
                  {items.sold
                    ? "Adquirido"
                    : items.price.toLocaleString("pt-BR", {
                        maximumFractionDigits: 0,
                      }) + "  C"}
                </div>
              </div>
              <div className="f-2">
                <img className="itemSimbol " src={`./ciclo.png`} />
              </div>
            </button>
          );
        })}
      </>
    );
  }

  useInterval(() => {
    changeItemStore();
    changeItemUpgrades();
  }, 100);

  switch (cell) {
    case "store":
      return ItemCellStore();
      break;
    case "upgrades":
      return ItemCellUpgrades();
      break;
    case "rewards":
      return ItemCellRewards();
      break;
  }
}
