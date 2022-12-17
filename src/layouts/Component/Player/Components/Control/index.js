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
      this.isPlaying = false;
      this.isReplay = LocalStorage.get("isReplaycmp3", false);
      this.start();
    }
    handleEvent() {
      function changeComePlay() {
        this.isPlaying = true;
        let icon = this.playDom.querySelector("span");
        icon.innerText = "pause_circle";
      }
      function changeComePause() {
        this.isPlaying = false;
        let icon = this.playDom.querySelector("span");
        icon.innerText = "play_circle";
      }
      function handelePlayandPause() {
        let icon = this.playDom.querySelector("span");
        if (this.isPlaying) {
          this.isPlaying = false;
          this.songDom.pause();
          icon.innerText = "play_circle";
        } else {
          this.isPlaying = true;
          this.songDom.play();
          icon.innerText = "pause_circle";
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
      this.songDom.onplay = changeComePlay.bind(this);
      this.songDom.onpause = changeComePause.bind(this);
      this.playDom.onclick = handelePlayandPause.bind(this);
      this.songDom.ontimeupdate = loadTime.bind(this);
      this.timeInputDom.oninput = changeCurrentTime.bind(this);
    }
    init() {
      this.songDom.autoPlay = true;
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
    if (Object.keys(song).length != 0) {
      song.songDom.onloadeddata = function () {
        song.songDom.play();
      };
    }
  }, [globalState.currentSong]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("control")}>
        <button ref={randomRef}>
          <span className="material-symbols-outlined">shuffle</span>
        </button>
        <button ref={prevRef}>
          <span className="material-symbols-outlined">skip_previous</span>
        </button>
        <button ref={playRef} className={cx("play")}>
          <span className={cx(["material-symbols-outlined"])}>play_circle</span>
        </button>
        <button ref={nextRef}>
          <span className="material-symbols-outlined">skip_next</span>
        </button>
        <button ref={replayRef}>
          <span className="material-symbols-outlined">replay</span>
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
