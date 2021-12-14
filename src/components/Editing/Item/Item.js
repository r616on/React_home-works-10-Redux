import React from "react";
import PropTypes from "prop-types";
import "./desktop.scss";

const Item = ({ id, operation, price, handleEdit, handleDel }) => {
  return (
    <div className="Item" id={id}>
      <span className="Item-item pointer"></span>
      <span className="Item-item operation">{operation}</span>
      <span className="Item-item price"> {price}</span>
      <span onClick={() => handleEdit(id)} className="Item-item  edit">
        <span className="material-icons edit">edit</span>
      </span>
      <span onClick={() => handleDel(id)} className="Item-item del">
        <span className="material-icons del">clear</span>
      </span>
    </div>
  );
};

Item.propTypes = {
  id: PropTypes.string,
  operation: PropTypes.string,
  handleEdit: PropTypes.func,
  handleDel: PropTypes.func,
};

export default Item;
