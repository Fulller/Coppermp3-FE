import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./Component/GlobalStyle";
import GlobalState from "./Component/GlobalState";
import RoutePage from "./Component/RoutePage";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <GlobalStyle>
          <GlobalState>
            <BrowserRouter>
              <RoutePage></RoutePage>
            </BrowserRouter>
          </GlobalState>
        </GlobalStyle>
      </div>
    </Provider>
  );
}

export default App;
