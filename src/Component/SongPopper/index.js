import { useState, useEffect } from "react";

import style from "./SongPopper.module.scss";
import classNames from "classnames/bind";

import urlMedia from "../../tools/urlMedia";
import services from "../../services";

import Headless from "@tippyjs/react/headless";
import Tippy from "@tippyjs/react";

let cx = classNames.bind(style);
function SongPopper({ song, style }) {
  let [isShow, setIsShow] = useState(false);
  function handleShowAndHide() {
    setIsShow(!isShow);
  }

  return (
    <Headless
      visible={isShow}
      render={(attrs) => (
        <div className={cx("popper")} tabIndex="-1" {...attrs} style={style}>
          <div className={cx("info")}>
            <img src={song.thumbnail}></img>
            <div className={cx("title-artist")}>
              <h4>{song.title}</h4>
              <h5>{song.artistsNames}</h5>
            </div>
          </div>
          <div className={cx("control")}>
            <a
              href={urlMedia.audio(song.encodeId)}
              download={"helo"}
              type="audio/mpeg"
            >
              <span className="material-symbols-outlined">download</span>
              <h6>Tải xuống</h6>
            </a>
            <button>
              <span className="material-symbols-outlined">lyrics</span>
              <h6>Lời bài hát</h6>
            </button>
          </div>
        </div>
      )}
      interactive={true}
      content="Xem thêm"
      placement="right-end"
      onClickOutside={() => {
        setIsShow(false);
      }}
    >
      <button className={cx("moreBtn")} onClick={handleShowAndHide}>
        <span className={cx(["material-symbols-outlined", "moreIcon"])}>
          more_horiz
        </span>
      </button>
    </Headless>
  );
}
export default SongPopper;
