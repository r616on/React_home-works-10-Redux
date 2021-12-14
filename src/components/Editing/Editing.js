import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./desktop.scss";
import Item from "./Item/Item";
const initForm = { operation: "", price: "" };
const iniList = [
  { id: uuidv4(), operation: "Замена масла", price: 4200 },
  { id: uuidv4(), operation: "Подкачка шин", price: 1200 },
  { id: uuidv4(), operation: "Замена масляного фильтра", price: 2200 },
];

export default function Editing() {
  const [form, setForm] = useState(initForm);
  const [list, setList] = useState(iniList);
  const [editАFlag, setEditАFlag] = useState(false);
  const [idEditEl, setIdEditEl] = useState();

  //////
  const handleChange = ({ target }) => {
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setForm((prevForm) => {
      return { ...prevForm, [name]: value };
    });
  };

  /////
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editАFlag) {
      setList((prev) => {
        const arr = [...prev.filter((item) => item.id !== idEditEl)];
        arr.push({
          id: idEditEl,
          operation: form.operation,
          price: form.price,
        });
        return arr;
      });
      setForm(initForm);
    } else {
      if (form.operation && form.price > 0) {
        setList((prev) => {
          const arr = [...prev];
          arr.push({
            id: uuidv4(),
            operation: form.operation,
            price: form.price,
          });
          return arr;
        });
        setForm(initForm);
      }
    }
  };

  ////
  const handleEdit = (id) => {
    setEditАFlag(true);
    setIdEditEl(id);
    list.forEach((item) => {
      if (item.id === id) {
        setForm({ operation: item.operation, price: item.price });
      }
    });
  };

  ////
  const handleDel = (id) => {
    setList((prev) => {
      return [...prev.filter((item) => item.id !== id)];
    });
  };

  return (
    <div className="Editing">
      <form className="Editing-form-row" onSubmit={handleSubmit}>
        <input
          className="form-item"
          name="operation"
          type="text"
          value={form.operation}
          onChange={handleChange}
        />

        <input
          className="form-item"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
        />

        <input className="form-item control" type="submit" value="Save" />
        {editАFlag && (
          <span
            onClick={() => {
              setEditАFlag(false);
              setForm(initForm);
            }}
            className="form-item control"
            value="Cancel"
          >
            Cancel
          </span>
        )}
      </form>
      <div className="Item-row">
        {list.map((item) => {
          const { id, operation, price } = item;
          return (
            <Item
              key={id}
              id={id}
              operation={operation}
              price={price}
              handleEdit={handleEdit}
              handleDel={handleDel}
            />
          );
        })}
      </div>
    </div>
  );
}
