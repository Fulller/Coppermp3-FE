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
      title: "Cá nhân",
      id: "home",
      link: "/discovery",
    },
    {
      icon: <span className="material-symbols-outlined">album</span>,
      title: "Khám phá",
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
      title: "Nhạc mới",
      id: "newReleaseChart",
      link: "/newReleaseChart",
    },
    {
      icon: <span className="material-symbols-outlined">star</span>,
      title: "Top 100",
      id: "top100",
      link: "/discovery",
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
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/ZingMP3logo.svg/555px-ZingMP3logo.svg.png"></img>
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
