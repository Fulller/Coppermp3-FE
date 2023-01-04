import style from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import domainbe from "../../../tools/domainbe";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../../Component/GlobalState";
import { useContext, useEffect } from "react";

let cx = classNames.bind(style);
function Sidebar() {
  let [globalState, dispatch] = useContext(GlobalContext);
  let listControl = [
    {
      icon: <span className="material-symbols-outlined">library_music</span>,
      title: "Cá Nhân",
      id: "home",
      link: "/discovery",
    },
    {
      icon: <span className="material-symbols-outlined">album</span>,
      title: "Khám Phá",
      id: "discovery",
      link: "/discovery",
    },
    {
      icon: <span className="material-symbols-outlined">monitoring</span>,
      title: "#zingchart",
      id: "zingchart",
      link: "/zingchart",
    },
    {
      icon: <span className="material-symbols-outlined">music_note</span>,
      title: "Nhạc Mới",
      id: "newReleaseChart",
      link: "/newReleaseChart",
    },
    {
      icon: <span className="material-symbols-outlined">star</span>,
      title: "Top 100",
      id: "top100",
      link: "/top100",
    },
    {
      icon: <span className="material-symbols-outlined">movie</span>,
      title: "MV",
      id: "mv",
      link: "/discovery",
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <header>
        <Link to={"/discovery"}>
          <img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg"></img>
        </Link>
      </header>
      <div className={cx("list-control")}>
        {listControl.map((control, index) => {
          return (
            <Link
              key={index}
              to={control.link}
              onClick={() =>
                dispatch({
                  type: "changePageActiveId",
                  payload: { pageId: control.id },
                })
              }
            >
              <div
                className={cx([
                  "item-control",
                  control.id == globalState.pageId ? "active" : "",
                ])}
              >
                <span>{control.icon}</span>
                <span className={cx("title")}>{control.title}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default Sidebar;
