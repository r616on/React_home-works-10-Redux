import { createStore, combineReducers } from "redux";
import formReducer from "./formReducer";
import listReducer from "./listReducer";

const rootReducer = combineReducers({
  formReducer,
  listReducer,
});
const store = createStore(rootReducer);

export default store;
