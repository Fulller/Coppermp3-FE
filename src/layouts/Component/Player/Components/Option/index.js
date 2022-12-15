import style from "./Option.module.scss";
import classNames from "classnames/bind";
import { useEffect, useRef } from "react";

let cx = classNames.bind(style);
function Option({ globalState, dispatch }) {
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
    dispatch({ type: "volume", payload: { volume: e.target.value } });
  }
  function handleOffVolume(e) {
    if (volumeIconRef.current.innerText == "volume_up") {
      songDom.volume = 0;
      volumeIconRef.current.innerText = "volume_off";
    } else {
      songDom.volume = globalState.volume / 100;
      volumeIconRef.current.innerText = "volume_up";
    }
  }
  useEffect(() => {
    songDom = document.getElementById("audio");
    volumeRef.current.value = globalState.volume;
    songDom.volume = globalState.volume / 100;
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
      <button>
        <span className="material-symbols-outlined">fullscreen</span>
      </button>
    </div>
  );
}
export default Option;
