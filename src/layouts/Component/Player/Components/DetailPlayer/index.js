import style from "./DetailPlayer.module.scss";
import classNames from "classnames/bind";
import { memo, useRef, useState } from "react";
import Lyric from "./Component/Lyric";
import Playlist from "./Component/Playlist";
import LocalStorage from "../../../../../tools/localStorage";

let cx = classNames.bind(style);
function Detailplayer({
  globalState,
  dispatch,
  setShowDetailPlayer,
  showDetailPlayer,
  children,
}) {
  let detailPlayerRef = useRef();
  function TopDetailPlayer() {
    let [optional, setOptional] = useState(
      LocalStorage.get("detailOptionalcmp3", "playlist")
    );
    const optionalList = [
      { title: "Danh sách phát", id: "playlist" },
      { title: "Lời bài hát", id: "lyric" },
    ];
    if (showDetailPlayer) {
      return (
        <>
          <div className={cx("header")}>
            <div className={cx("optionalList")}>
              {optionalList.map((optionalItem, index) => {
                return (
                  <div
                    className={cx([
                      "optionalItem",
                      optional == optionalItem.id ? "activeOptional" : "",
                    ])}
                    key={index}
                    onClick={() => {
                      LocalStorage.set("detailOptionalcmp3", optionalItem.id);
                      setOptional(optionalItem.id);
                    }}
                  >
                    {optionalItem.title}
                  </div>
                );
              })}
            </div>
            <button
              onClick={(e) => {
                detailPlayerRef.current.className = cx([
                  "active",
                  "hideDetailPlayer",
                ]);
                setTimeout(() => {
                  setShowDetailPlayer(false);
                }, 300);
              }}
            >
              <span className="material-symbols-outlined">expand_more</span>
            </button>
          </div>
          <div className={cx("container")}>
            {optional == "playlist" ? <Playlist></Playlist> : <></>}
            {optional == "lyric" ? <Lyric></Lyric> : <></>}
          </div>
        </>
      );
    }
    return <></>;
  }
  return (
    <div className={showDetailPlayer ? cx("active") : ""} ref={detailPlayerRef}>
      <TopDetailPlayer></TopDetailPlayer>
      <div
        className={cx("background")}
        style={{
          backgroundImage: `url(${globalState.currentSong.thumbnailM})`,
        }}
      ></div>
      <div className={cx("control")}>{children}</div>
    </div>
  );
}
export default memo(Detailplayer);