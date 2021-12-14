import { v4 as uuidv4 } from "uuid";

const initialState = {
  items: [
    { id: uuidv4(), operation: "Замена масла", price: 4200 },
    { id: uuidv4(), operation: "Подкачка шин", price: 1200 },
    { id: uuidv4(), operation: "Замена масляного фильтра", price: 2200 },
  ],
  loading: "idel",
};

//action={type:"",payload:""}
export default function listReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const item = action.payload;
      const newState = {
        ...state,
        items: [...state.items, { ...item, id: uuidv4() }],
      };
      return newState;

    case "EDIT_ITEM":
      const { idItem, itemEdit } = action.payload;
      return {
        ...state,
        items: [
          ...state.items.filter((item) => item.id !== idItem),
          { ...itemEdit, id: idItem },
        ],
      };

    case "DELETE_ITEM":
      const id = action.payload;
      return { ...state, items: state.items.filter((item) => item.id !== id) };

    default:
      return state;
  }
}
