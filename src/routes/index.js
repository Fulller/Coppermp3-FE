import Discovery from "../pages/Discovery";
import Login from "../pages/Login";
import Signin from "../pages/Signin";
import Playlist from "../pages/Playlist";
import Search from "../pages/Search";
import ZingChar from "../pages/ZingChar";
import WeekChart from "../pages/WeekChart";
import NewReleaseChart from "../pages/NewReleaseChart";
import Artist from "../pages/Artist";
import Top100 from "../pages/Top100";
import Personal from "../pages/Personal";

import Mainlayout from "../layouts/Mainlayout";
let publicRoute = [
  { path: "/", element: Discovery, layout: Mainlayout },
  { path: "/discovery", element: Discovery, layout: Mainlayout },
  { path: "/login", element: Login },
  { path: "/signin", element: Signin },
  { path: "/playlist", element: Playlist, layout: Mainlayout },
  { path: "/search", element: Search, layout: Mainlayout },
  { path: "/zingchart", element: ZingChar, layout: Mainlayout },
  { path: "/weekchart", element: WeekChart, layout: Mainlayout },
  {
    path: "/newReleaseChart",
    element: NewReleaseChart,
    layout: Mainlayout,
  },
  { path: "/artist", element: Artist, layout: Mainlayout },
  { path: "/top100", element: Top100, layout: Mainlayout },
  { path: "/personal", element: Personal, layout: Mainlayout },
];
export { publicRoute };
