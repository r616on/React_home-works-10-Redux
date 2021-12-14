import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./desktop.scss";
import Item from "./Item/Item";

export default function Editing() {
  const dispatch = useDispatch();
  const list = useSelector((store) => store.listReducer.items);
  const form = useSelector((store) => store.formReducer);
  const [editАFlag, setEditАFlag] = useState(false);
  const [idEditEl, setIdEditEl] = useState();

  //////
  const handleChange = ({ target }) => {
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    dispatch({ type: "CHANGE_FORM_VALUES", payload: { fild: name, value } });
  };

  /////
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editАFlag) {
      setEditАFlag(false);
      dispatch({
        type: "EDIT_ITEM",
        payload: {
          idItem: idEditEl,
          itemEdit: { operation: form.operation, price: form.price },
        },
      });
      dispatch({ type: "CHANGE_FORM_INIT" });
    } else {
      if (form.operation && form.price > 0) {
        dispatch({
          type: "ADD_ITEM",
          payload: { operation: form.operation, price: form.price },
        });
        dispatch({ type: "CHANGE_FORM_INIT" });
      }
    }
  };

  ////
  const handleEdit = (id) => {
    setEditАFlag(true);
    setIdEditEl(id);
    list.forEach((item) => {
      if (item.id === id) {
        dispatch({
          type: "CHANGE_FORM_VALUES",
          payload: { fild: "operation", value: item.operation },
        });
        dispatch({
          type: "CHANGE_FORM_VALUES",
          payload: { fild: "price", value: item.price },
        });
      }
    });
  };

  ////
  const handleDel = (id) => {
    dispatch({
      type: "DELETE_ITEM",
      payload: id,
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
              dispatch({ type: "CHANGE_FORM_INIT" });
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
