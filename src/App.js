import "./App.css";
import Editing from "./components/Editing/Editing";
import SecondTask from "./components/SecondTask/SecondTask";
import { Provider } from "react-redux";
import store from "./components/redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Editing />

        {/* <SecondTask /> */}
      </div>
    </Provider>
  );
}

export default App;
