import style from "./Option.module.scss";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import LocalStorage from "../../../../../tools/localStorage";
import Headless from "@tippyjs/react/headless";
import MVicon from "../../../../../Component/MVicon";
import Popper from "../../../../../Component/Popper";

let cx = classNames.bind(style);
function Option({
  globalState,
  dispatch,
  setShowDetailPlayer,
  showDetailPlayer,
}) {
  let volumeRef = useRef();
  let volumeIconRef = useRef();
  let songDom = document.getElementById("audio");

  function changeVolume(e) {
    if (e.target.value == 0) {
      volumeIconRef.current.innerText = "volume_off";
    } else {
      volumeIconRef.current.innerText = "volume_up";
    }
    songDom.volume = e.target.value / 100;
    LocalStorage.set("volumecmp3", e.target.value * 1);
  }
  function handleOffVolume(e) {
    if (volumeIconRef.current.innerText == "volume_up") {
      songDom.volume = 0;
      volumeIconRef.current.innerText = "volume_off";
    } else {
      songDom.volume = LocalStorage.get("volumecmp3") / 100;
      volumeIconRef.current.innerText = "volume_up";
    }
  }
  useEffect(() => {
    songDom = document.getElementById("audio");
    volumeRef.current.value = LocalStorage.get("volumecmp3", 100);
    songDom.volume = LocalStorage.get("volumecmp3", 100) / 100;
    songDom.onvolumechange = function () {
      volumeRef.current.value = songDom.volume * 100;
      LocalStorage.set("volumecmp3", volumeRef.current.value);
    };
  }, []);
  return (
    <div className={cx("wrapper")}>
      <MVicon data={globalState.currentSong} type="blur"></MVicon>
      <Popper content={"Xem lời bài hát"}>
        <button>
          <span
            className="material-symbols-outlined"
            onClick={() => {
              LocalStorage.set("detailOptionalcmp3", "lyric");
              setShowDetailPlayer(!showDetailPlayer);
            }}
          >
            mic_external_on
          </span>
        </button>
      </Popper>
      <Popper content={"Âm lượng"}>
        <button onClick={handleOffVolume}>
          <span className="material-symbols-outlined" ref={volumeIconRef}>
            volume_up
          </span>
        </button>
      </Popper>
      <input
        ref={volumeRef}
        type="range"
        max={100}
        onChange={changeVolume}
      ></input>
      <Popper content={"Pro player"}>
        <button
          id="showDetailBtn"
          onClick={() => setShowDetailPlayer(!showDetailPlayer)}
          className={cx("detailBtn")}
        >
          <span className={cx(["material-symbols-outlined"])}>
            keyboard_arrow_up
          </span>
        </button>
      </Popper>
    </div>
  );
}
export default Option;
