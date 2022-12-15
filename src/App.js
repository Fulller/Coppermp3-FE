import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./Component/GlobalStyle";
import GlobalState from "./Component/GlobalState";
import RoutePage from "./Component/RoutePage";

function App() {
  return (
    <div className="App">
      <GlobalStyle>
        <GlobalState>
          <BrowserRouter>
            <RoutePage></RoutePage>
          </BrowserRouter>
        </GlobalState>
      </GlobalStyle>
    </div>
  );
}

export default App;
