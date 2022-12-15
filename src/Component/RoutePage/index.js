import { Routes, Route } from "react-router";
import { publicRoute } from "../../routes";

function RoutePage() {
  return (
    <Routes>
      {publicRoute.map((route, index) => {
        let Page = route.element;
        let Layout = route.layout;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              Layout ? (
                <Layout>
                  <Page></Page>
                </Layout>
              ) : (
                <Page></Page>
              )
            }
          ></Route>
        );
      })}
    </Routes>
  );
}
export default RoutePage;
