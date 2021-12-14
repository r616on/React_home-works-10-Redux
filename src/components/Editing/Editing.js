import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./desktop.scss";
import Item from "./Item/Item";

export default function Editing() {
  const dispatch = useDispatch();
  const { items, filtered, filterFlag } = useSelector(
    (store) => store.listReducer
  );
  const form = useSelector((store) => store.formReducer);
  const { filter } = useSelector((store) => store.formReducer);

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
    items.forEach((item) => {
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
  ///
  useEffect(() => {
    dispatch({ type: "FILTER_ITEM", payload: filter });
    // eslint-disable-next-line
  }, [filter, items]);

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
        <div className="Filter">
          <label form="filter" className="lable-filter">
            Фильтр задач
          </label>
          <input
            id="filter"
            className="form-item"
            name="filter"
            type="text"
            value={form.filter}
            onChange={handleChange}
          />
        </div>
      </form>
      <div className="Item-row">
        {!filterFlag &&
          items.map((item) => {
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

        {filterFlag &&
          filtered.map((item) => {
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
