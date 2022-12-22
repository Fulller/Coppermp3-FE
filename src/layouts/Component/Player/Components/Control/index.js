import style from "./Control.module.scss";
import classNames from "classnames/bind";
import { useState, useRef, useEffect } from "react";
import urlMedia from "../../../../../tools/urlMedia";
import LocalStorage from "../../../../../tools/localStorage";

let cx = classNames.bind(style);
function Control({ globalState, dispatch }) {
  let prevRef = useRef();
  let playRef = useRef();
  let nextRef = useRef();
  let randomRef = useRef();
  let timeInputRef = useRef();
  let timeCurrentRef = useRef();
  let timeEndRef = useRef();
  let replayRef = useRef();
  let cs = globalState.currentSong;
  class Song {
    constructor({
      prevRef,
      playRef,
      nextRef,
      randomRef,
      timeInputRef,
      timeCurrentRef,
      timeEndRef,
      replayRef,
    }) {
      this.songDom = document.getElementById("audio");
      this.playDom = playRef.current;
      this.timeInputDom = timeInputRef.current;
      this.timeCurrentDom = timeCurrentRef.current;
      this.timeEndDom = timeEndRef.current;
      this.replayDom = replayRef.current;
      this.prevDom = prevRef.current;
      this.nextDom = nextRef.current;
      this.isPlaying = false;
      this.isReplay = LocalStorage.get("isReplaycmp3", false);
      this.start();
    }
    handleEvent() {
      function changeComePlay() {
        this.isPlaying = true;
        let icon = this.playDom.querySelector("span");
        icon.innerText = "pause";
        dispatch({ type: "isPlay", payload: { isPlay: true } });
      }
      function changeComePause() {
        this.isPlaying = false;
        let icon = this.playDom.querySelector("span");
        icon.innerText = "play_arrow";
        dispatch({ type: "isPlay", payload: { isPlay: false } });
      }
      function handelePlayandPause() {
        let icon = this.playDom.querySelector("span");
        if (this.isPlaying) {
          this.isPlaying = false;
          this.songDom.pause();
          icon.innerText = "play_arrow";
        } else {
          this.isPlaying = true;
          this.songDom.play();
          icon.innerText = "pause";
        }
      }
      function loadTime() {
        let ctime = Math.floor(this.songDom.currentTime);
        function nomalizeTime(time) {
          if (isNaN(time)) {
            return "0:00";
          }
          let minus = Math.floor(time / 60).toString();
          let second = Math.floor(time % 60).toString();
          return `${minus.length == 1 ? "0" + minus : minus}:${
            second.length == 1 ? "0" + second : second
          }`;
        }
        this.timeInputDom.value = ctime;
        this.timeInputDom.max = this.songDom.duration;
        this.timeCurrentDom.innerText = nomalizeTime(ctime);
        this.timeEndDom.innerText = nomalizeTime(this.songDom.duration);
        LocalStorage.set("timecmp3", ctime);
      }
      function changeCurrentTime(e) {
        this.songDom.currentTime = this.timeInputDom.value;
      }
      function handleKeyboad(e) {
        e.preventDefault();
        function setPercentTime(percent) {
          this.songDom.currentTime = (percent / 10) * this.songDom.duration;
        }
        function setVolume(type) {
          if (type == "down") {
            if (this.songDom.volume > 0) {
              this.songDom.volume =
                Math.floor(this.songDom.volume * 10) / 10 - 0.1;
            }
          } else {
            if (this.songDom.volume < 1) {
              this.songDom.volume =
                Math.ceil(this.songDom.volume * 10) / 10 + 0.1;
            }
          }
        }
        switch (e.key) {
          case " ": {
            this.playDom.click();
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
            setPercentTime.call(this, e.key);
            break;
          }
          case "ArrowDown":
          case "ArrowLeft": {
            setVolume.call(this, "down");
            break;
          }
          case "ArrowUp":
          case "ArrowRight": {
            setVolume.call(this, "up");
            break;
          }
        }
      }
      function handleEndSong(e) {
        this.nextDom.click();
      }

      this.songDom.onplay = changeComePlay.bind(this);
      this.songDom.onpause = changeComePause.bind(this);
      this.playDom.onclick = handelePlayandPause.bind(this);
      this.songDom.ontimeupdate = loadTime.bind(this);
      this.timeInputDom.oninput = changeCurrentTime.bind(this);
      this.songDom.onended = handleEndSong.bind(this);

      document.documentElement.onkeydown = handleKeyboad.bind(this);
    }
    init() {
      this.songDom.currentTime = LocalStorage.get("timecmp3", 0);
      this.timeInputDom.value = LocalStorage.get("timecmp3", 0);
      this.timeInputDom.max = this.songDom.duration;
    }
    start() {
      this.init();
      this.handleEvent();
    }
  }
  let [song, setSong] = useState({});
  useEffect(() => {
    setSong(
      new Song({
        prevRef,
        playRef,
        nextRef,
        randomRef,
        timeInputRef,
        timeCurrentRef,
        timeEndRef,
        replayRef,
      })
    );
  }, []);
  useEffect(() => {
    if (Object.keys(song).length != 0) {
      dispatch({ type: "isPlay", payload: { isPlay: false } });
      song.songDom.onloadeddata = function () {
        song.songDom.currentTime = 0;
        song.songDom.play();
        dispatch({ type: "isPlay", payload: { isPlay: true } });
      };
    }
  }, [globalState.currentSong.encodeId]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("control")}>
        <button ref={randomRef}>
          <span className="material-symbols-outlined">shuffle</span>
        </button>
        <button
          ref={prevRef}
          onClick={() => {
            if (globalState.prevSong) {
              dispatch({
                type: "currentSong",
                payload: { currentSong: globalState.prevSong },
              });
            }
          }}
          className={cx(!globalState.prevSong ? "disable" : "")}
        >
          <span className="material-symbols-outlined">skip_previous</span>
        </button>
        <button ref={playRef} className={cx("play")}>
          <span className={cx(["material-symbols-outlined"])}>play_arrow</span>
        </button>
        <button
          ref={nextRef}
          onClick={() => {
            if (globalState.nextSong) {
              dispatch({
                type: "currentSong",
                payload: { currentSong: globalState.nextSong },
              });
            }
          }}
          className={cx(!globalState.nextSong ? "disable" : "")}
        >
          <span className="material-symbols-outlined">skip_next</span>
        </button>
        <button ref={replayRef}>
          <span className="material-symbols-outlined">autorenew</span>
        </button>
      </div>
      <div className={cx("time")}>
        <span ref={timeCurrentRef}>0:00</span>
        <input ref={timeInputRef} type="range" max="100"></input>
        <span ref={timeEndRef}>4:00</span>
      </div>
    </div>
  );
}
export default Control;
