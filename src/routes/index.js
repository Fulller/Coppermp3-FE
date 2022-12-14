import Home from "../pages/Home";
import Login from "../pages/Login";
import Signin from "../pages/Signin";
let publicRoute = [
  { path: "/", element: Home },
  { path: "/home", element: Home },
  { path: "/login", element: Login },
  { path: "/signin", element: Signin },
];
export { publicRoute };
