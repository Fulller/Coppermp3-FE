import style from "./Option.module.scss";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import LocalStorage from "../../../../../tools/localStorage";
import Headless from "@tippyjs/react/headless";
import DetailPlayer from "../../../DetailPlayer";

let cx = classNames.bind(style);
function Option({ globalState, dispatch }) {
  let [showDetailPlayer, setShowDetailPlayer] = useState(false);
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
      <button>
        <span className="material-symbols-outlined">movie</span>
      </button>
      <button>
        <span className="material-symbols-outlined">mic_external_on</span>
      </button>
      <button onClick={handleOffVolume}>
        <span className="material-symbols-outlined" ref={volumeIconRef}>
          volume_up
        </span>
      </button>
      <input
        ref={volumeRef}
        type="range"
        max={100}
        onChange={changeVolume}
      ></input>
      <button onClick={() => setShowDetailPlayer(true)}>
        <span className="material-symbols-outlined">keyboard_arrow_up</span>
      </button>
      {showDetailPlayer ? (
        <DetailPlayer setShowDetailPlayer={setShowDetailPlayer}></DetailPlayer>
      ) : (
        <></>
      )}
    </div>
  );
}
export default Option;
