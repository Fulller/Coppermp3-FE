import style from "./DetailPlayer.module.scss";
import classNames from "classnames/bind";
import { memo, useState, useContext } from "react";
import Control from "../Player/Components/Control";
import { GlobalContext } from "../../../Component/GlobalState";

let cx = classNames.bind(style);
function DetailPlayer({ setShowDetailPlayer }) {
  let [globalState, dispatch] = useContext(GlobalContext);
  const listControl = [
    {
      title: "Danh sách phát",
      id: "playlist",
    },
    {
      title: "Lời bài hát",
      id: "lyric",
    },
  ];
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("control")}>
          {listControl.map((control, index) => {
            return (
              <div className={cx("control-item")} key={index}>
                <h3>{control.title}</h3>
              </div>
            );
          })}
        </div>
        <button
          className={cx("close")}
          onClick={() => setShowDetailPlayer(false)}
        >
          <span className="material-symbols-outlined">expand_more</span>
        </button>
      </div>
      <div className={cx("container")}></div>
      <div className={cx("wrapper-control")}></div>
    </div>
  );
}
export default memo(DetailPlayer);
