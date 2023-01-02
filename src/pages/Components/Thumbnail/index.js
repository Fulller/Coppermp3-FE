import style from "./Thumbnail.module.scss";
import classNames from "classnames/bind";
import { GlobalContext } from "../../../Component/GlobalState";
import { useContext, useEffect, useState } from "react";

let cx = classNames.bind(style);
function Thumbnail({
  size,
  src,
  fontSize = 20,
  dataSong,
  playList,
  playListEncodeId,
}) {
  let [globalState, dispatch] = useContext(GlobalContext);
  let audioDom = null;

  function Control() {
    if (
      globalState.currentSong.encodeId == dataSong.encodeId &&
      globalState.isPlay
    ) {
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
        <i className="fa-solid fa-play" style={{ fontSize: fontSize }}></i>
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

{
  /* <Thumbnail
  size={50}
  src={item.thumbnail}
  dataSong={item}
  playList={data}
></Thumbnail>;
className={
  cx([
    "item",
    globalState.currentSong.encodeId == item.encodeId
      ? "active"
      : "",
  ]) +
  " " +
  cxThumbnail([
    "item",
    globalState.currentSong.encodeId == item.encodeId
      ? "active"
      : "",
  ])
} */
}
