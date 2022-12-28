import style from "./Control.module.scss";
import classNames from "classnames/bind";
import { useState, useRef, useEffect, useReducer } from "react";
import urlMedia from "../../../../../tools/urlMedia";
import LocalStorage from "../../../../../tools/localStorage";
import { doc } from "prettier";

let cx = classNames.bind(style);

function Control({ globalState, dispatch, style, showDetailPlayer }) {
  let audio = document.querySelector("audio");
  let timeRef = useRef();
  let controlRef = useRef();
  let [isReplay, setIsReplay] = useState(
    LocalStorage.get("isReplaycmp3", false)
  );
  let [isRandom, setIsRandom] = useState(
    LocalStorage.get("isRandomcmp3", false)
  );
  useEffect(() => {
    let [randomDom, prevDom, playDom, nextDom, replayDom] =
      controlRef.current.children;
    let [currentTimeDom, inputTimeDom, durationTimeDom] =
      timeRef.current.children;
    let iconPlay = playDom.querySelector("span");

    audio = document.querySelector("audio");
    audio.currentTime = LocalStorage.get("timecmp3", 0);
    audio.oncanplaythrough = function () {
      audio.play();
    };
    audio.onload = function () {
      dispatch({ type: "isPlay", payload: { isPlay: false } });
    };
    audio.onplay = function () {
      iconPlay.innerText = "pause";
      dispatch({ type: "isPlay", payload: { isPlay: true } });
    };
    audio.onpause = function () {
      iconPlay.innerText = "play_arrow";
      dispatch({ type: "isPlay", payload: { isPlay: false } });
    };
    audio.ontimeupdate = function () {
      let { currentTime, duration } = audio;
      inputTimeDom.value = currentTime;
      inputTimeDom.max = duration;
      currentTimeDom.innerText = nomalizeTime(currentTime);
      durationTimeDom.innerText = nomalizeTime(duration);
      LocalStorage.set("timecmp3", currentTime);
      LocalStorage.set("durationcmp3", duration);
    };
    audio.onended = function () {
      if (LocalStorage.get("isReplaycmp3", false)) {
        playDom.click();
      } else {
        if (LocalStorage.get("isRandomcmp3", false)) {
          randomPlaySong();
        } else {
          nextDom.click();
        }
      }
    };
    document.documentElement.onkeydown = function (e) {
      e.preventDefault();
      switch (e.key) {
        case " ": {
          playDom.click();
          break;
        }
        case ",": {
          prevDom.click();
          break;
        }
        case ".": {
          nextDom.click();
          break;
        }
        case "ArrowLeft": {
          audio.currentTime -= 10;
          break;
        }
        case "ArrowRight": {
          audio.currentTime += 10;
          break;
        }
        case "ArrowUp": {
          if (audio.volume < 1) {
            audio.volume = Math.ceil((audio.volume + 0.1) * 10) / 10;
          }
          break;
        }
        case "ArrowDown": {
          if (audio.volume > 0) {
            audio.volume = Math.floor((audio.volume - 0.1) * 10) / 10;
          }
          break;
        }
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9": {
          audio.currentTime = Math.floor((e.key / 10) * audio.duration);
          break;
        }
      }
    };
  }, []);

  function nomalizeTime(time) {
    if (isNaN(time)) {
      return "00:00";
    }
    let minus = Math.floor(time / 60).toString();
    let second = Math.floor(time % 60).toString();
    return `${minus.length == 1 ? "0" + minus : minus}:${
      second.length == 1 ? "0" + second : second
    }`;
  }
  function handlePlaybtn(e) {
    let span = e.target.closest("button").children[0];
    if (globalState.isPlay) {
      span.innerText = "play_arrow";
      audio.pause();
    } else {
      span.innerText = "pause";
      audio.play();
    }
  }
  function handlePrevBtn(e) {
    if (globalState.prevSong) {
      if (LocalStorage.get("isRandomcmp3", false)) {
        randomPlaySong();
      } else {
        dispatch({
          type: "currentSong",
          payload: { currentSong: globalState.prevSong },
        });
      }
    }
  }
  function handleNextBtn(e) {
    if (globalState.nextSong) {
      if (LocalStorage.get("isRandomcmp3", false)) {
        randomPlaySong();
      } else {
        dispatch({
          type: "currentSong",
          payload: { currentSong: globalState.nextSong },
        });
      }
    }
  }
  function hanleChangeCurrentTime(e) {
    audio.currentTime = e.target.value;
  }
  function handleChangeIsReplay(e) {
    LocalStorage.set("isReplaycmp3", !isReplay);
    setIsReplay(!isReplay);
  }
  function handleChangeIsRandom(e) {
    LocalStorage.set("isRandomcmp3", !isRandom);
    setIsRandom(!isRandom);
  }
  function randomPlaySong() {
    let songRandom = globalState.currentSong;
    if (globalState.currentPlaylist.length > 1) {
      while (songRandom.encodeId == globalState.currentSong.encodeId) {
        songRandom =
          globalState.currentPlaylist[
            Math.floor(Math.random() * globalState.currentPlaylist.length)
          ];
      }
    }
    dispatch({
      type: "currentSong",
      payload: { currentSong: songRandom },
    });
  }
  return (
    <div
      className={cx(["wrapper", showDetailPlayer && "detailPlayer"])}
      style={style}
    >
      <div className={cx("control")} ref={controlRef}>
        <button
          className={cx(isRandom ? "active" : "")}
          onClick={handleChangeIsRandom}
        >
          <span className="material-symbols-outlined">shuffle</span>
        </button>
        <button
          onClick={handlePrevBtn}
          className={cx(globalState.prevSong ? "" : "disable")}
        >
          <span className="material-symbols-outlined">skip_previous</span>
        </button>
        <button className={cx("play")} onClick={handlePlaybtn}>
          <span className={cx(["material-symbols-outlined"])}>play_arrow</span>
        </button>
        <button
          onClick={handleNextBtn}
          className={cx(globalState.nextSong ? "" : "disable")}
        >
          <span className="material-symbols-outlined">skip_next</span>
        </button>
        <button
          onClick={handleChangeIsReplay}
          className={cx(isReplay ? "active" : "")}
        >
          <span className="material-symbols-outlined">autorenew</span>
        </button>
      </div>
      <div ref={timeRef} className={cx("time")}>
        <span>{nomalizeTime(LocalStorage.get("timecmp3", 0))}</span>
        <input
          type="range"
          onInput={hanleChangeCurrentTime}
          value={LocalStorage.get("timecmp3", 0)}
          max={LocalStorage.get("durationcmp3", 0)}
        ></input>
        <span style={{ color: "white" }}>
          {nomalizeTime(LocalStorage.get("durationcmp3", 0))}
        </span>
      </div>
    </div>
  );
}
export default Control;
