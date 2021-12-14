import "./App.css";
import Editing from "./components/Editing/Editing";
import { Provider } from "react-redux";
import store from "./components/redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Editing />
      </div>
    </Provider>
  );
}

export default App;
