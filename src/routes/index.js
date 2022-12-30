import Discovery from "../pages/Discovery";
import Login from "../pages/Login";
import Signin from "../pages/Signin";
import Playlist from "../pages/Playlist";
import Search from "../pages/Search";

import Mainlayout from "../layouts/Mainlayout";
let publicRoute = [
  { path: "/", element: Discovery, layout: Mainlayout },
  { path: "/discovery", element: Discovery, layout: Mainlayout },
  { path: "/login", element: Login },
  { path: "/signin", element: Signin },
  { path: "/playlist", element: Playlist, layout: Mainlayout },
  { path: "/search", element: Search, layout: Mainlayout },
];
export { publicRoute };
