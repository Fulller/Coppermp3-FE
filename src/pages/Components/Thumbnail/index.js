import style from "./Thumbnail.module.scss";
import classNames from "classnames/bind";
import { GlobalContext } from "../../../Component/GlobalState";
import { useContext, useEffect, useState } from "react";

let cx = classNames.bind(style);
function Thumbnail({
  size,
  src,
  fontSize = 30,
  dataSong,
  active,
  playList,
  playListEncodeId,
}) {
  let [globalState, dispatch] = useContext(GlobalContext);
  let audioDom = null;

  function Control() {
    if (active && globalState.isPlay) {
      return (
        <div className={cx("animatePlay")}>
          <span className={cx("cl1")}></span>
          <span className={cx("cl2")}></span>
          <span className={cx("cl3")}></span>
          <span className={cx("cl4")}></span>
          <span className={cx("cl5")}></span>
        </div>
      );
    } else {
      return (
        <span
          className="material-symbols-outlined"
          style={{ fontSize: fontSize }}
        >
          play_arrow
        </span>
      );
    }
  }
  return (
    <div
      className={cx("thumbnail")}
      style={{ height: size, width: size }}
      onClick={() => {
        if (playList) {
          dispatch({
            type: "currentPlaylist",
            payload: { currentPlaylist: playList },
          });
        }
        dispatch({
          type: "currentSong",
          payload: { currentSong: { ...dataSong, playListEncodeId } },
        });
      }}
    >
      <img src={src} height={size} width={size}></img>
      <div className={cx("control")} style={{ height: size, width: size }}>
        <Control></Control>
      </div>
    </div>
  );
}
export { cx as cxThumbnail };
export default Thumbnail;
