import React, { useState } from "react";
import axios from "axios";

function Dropdown({ setSkill, handleSkillChange, multiselect = false }) {
  //hooks
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const [placeholder, setPlaceHolder] = useState("Choose skill");

  const [dataOfProducts, setDataOfProducts] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://localhost:3000/products`).then((res) => {
      let dataOfProducts = res.data;
      setDataOfProducts(dataOfProducts);
      console.log("heyyy", dataOfProducts);
    });
  }, []);

  // functions
  const toggle = () => setOpen(!open);

  const handleOnclick = (item) => {
    if (!selection.some((current) => current.id === item.id)) {
      if (!multiselect) {
        setSelection([item]);
      } else if (multiselect) {
        setSelection([...selection, item]);
      }
    } else {
      let selecionAfterRemoval = selection;
      selecionAfterRemoval = selecionAfterRemoval.filter(
        (current) => current.id !== item.id
      );
      setSelection([...selecionAfterRemoval]);
    }

    setPlaceHolder(item.value);
    toggle(!open);
    handleSkillChange();
    setSkill(item.value);
  };

  function isItemSelected(item) {
    if (selection.find((current) => current.id === item.id)) return true;
    else {
      return false;
    }
  }

  return (
    <div className="dd-wrapper">
      <div
        className="dd-header"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className="dd-header__title">
          <p className="dd-header__title--bold"> {placeholder}</p>
        </div>
        <div className="dd-header__action">
          <p>
            {" "}
            {open ? (
              <i className="small icon-black material-icons">arrow_drop_up</i>
            ) : (
              <i className="small icon-black material-icons">arrow_drop_down</i>
            )}
          </p>
        </div>
      </div>
      {open && (
        <ul className="dd-list">
          {dataOfProducts.map((item) => (
            <li className="dd-list-item" key={item.id}>
              <button className="dd-button" onClick={() => handleOnclick(item)}>
                <span> {item.value}</span>
                <span> {isItemSelected(item) && "Selected"}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
