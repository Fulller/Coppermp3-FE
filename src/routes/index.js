import Home from "../pages/Home";
import Login from "../pages/Login";
import Signin from "../pages/Signin";

import Mainlayout from "../layouts/Mainlayout";
let publicRoute = [
  { path: "/", element: Home, layout: Mainlayout },
  { path: "/home", element: Home, layout: Mainlayout },
  { path: "/login", element: Login },
  { path: "/signin", element: Signin },
];
export { publicRoute };
