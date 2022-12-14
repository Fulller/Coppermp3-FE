import { Route, Routes, Link } from "react-router-dom";
import { publicRoute } from "./routes";

function App() {
  return (
    <div className="App">
      {
        <Routes>
          {publicRoute.map((route, index) => {
            let Page = route.element;
            return (
              <Route
                key={index}
                path={route.path}
                element={<Page></Page>}
              ></Route>
            );
          })}
        </Routes>
      }
    </div>
  );
}

export default App;
