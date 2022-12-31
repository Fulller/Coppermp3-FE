import style from "./Playlist.module.scss";
import classNames from "classnames/bind";
import { GlobalContext } from "../../../../../../../Component/GlobalState";
import { useContext, memo, useState, useRef, useEffect } from "react";

let cx = classNames.bind(style);
function Playlist() {
  let [globalState, dispatch] = useContext(GlobalContext);
  let listRef = useRef();
  function handleScrollBack() {
    listRef.current.scrollLeft -= 400;
  }
  function handleScrollForward() {
    listRef.current.scrollLeft += 400;
  }
  useEffect(() => {
    function getIndexMainSong() {
      for (let i = 0; i < globalState.currentPlaylist.length; i++) {
        if (
          globalState.currentSong.encodeId ==
          globalState.currentPlaylist[i].encodeId
        ) {
          return i;
        }
      }
      return 0;
    }
    let newIndexmainsong = getIndexMainSong();
    let main = document.querySelector("#" + cx("item" + newIndexmainsong));
    if (globalState.isPlay) {
      main.innerHTML += `<div  class="${cx("playingAnimation")}">
      <span class="${cx("cl1")}"></span>
      <span class="${cx("cl2")}"></span>
      <span class="${cx("cl3")}"></span>
      <span class="${cx("cl4")}"></span>
      <span class="${cx("cl5")}"></span>
      </div>`;
    }
    listRef.current.scrollLeft = newIndexmainsong * 400;
    setInterval(() => {
      listRef.current.scrollLeft = newIndexmainsong * 400;
    }, 10000);
  }, [globalState.currentSong]);

  return (
    <div className={cx("wrapper")}>
      <button
        className={cx("backBtn")}
        onClick={handleScrollBack}
        onDoubleClick={handleScrollBack}
      >
        <span className="material-symbols-outlined">arrow_back_ios</span>
      </button>
      <button
        className={cx("forwardBtn")}
        onClick={handleScrollForward}
        onDoubleClick={handleScrollForward}
      >
        <span className="material-symbols-outlined">arrow_forward_ios</span>
      </button>
      <div className={cx("list")} ref={listRef}>
        <div className={cx("item")}></div>
        {globalState.currentPlaylist.map((song, index) => {
          return (
            <div
              className={cx([
                "item",
                globalState.currentSong.encodeId == song.encodeId
                  ? "currentSong"
                  : "",
              ])}
              id={cx("item" + index)}
            >
              <img src={song.thumbnailM}></img>
              <div
                className={cx("control")}
                onClick={() => {
                  dispatch({
                    type: "currentSong",
                    payload: { currentSong: song },
                  });
                }}
              >
                <span className={cx(["material-symbols-outlined", "play"])}>
                  play_arrow
                </span>
              </div>
            </div>
          );
        })}
        <div className={cx("item")}></div>
      </div>
    </div>
  );
}
export default memo(Playlist);
