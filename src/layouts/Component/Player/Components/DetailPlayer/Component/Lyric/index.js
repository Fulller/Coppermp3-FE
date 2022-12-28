import style from "./Lyric.module.scss";
import classNames from "classnames/bind";
import LocalStorage from "../../../../../../../tools/localStorage";
import { main } from "@popperjs/core";
import { useEffect, useRef, memo, useContext } from "react";
import { GlobalContext } from "../../../../../../../Component/GlobalState";

let cx = classNames.bind(style);
function Lyric({ lyric }) {
  let [globalState, dispatch] = useContext(GlobalContext);
  let lyricRef = useRef();
  let mainLine = useRef(null);

  useEffect(() => {
    let lyricInterval = setInterval(() => {
      if (globalState.isPlay && lyric) {
        if (mainLine.current) {
          mainLine.current.style.color = "white";
        }
        let indexMainLine = -1;
        for (let i in lyric) {
          if (
            lyric[i].startTime / 1000 - 0.5 >
            LocalStorage.get("timecmp3", 0)
          ) {
            indexMainLine = i * 1 - 1;
            break;
          }
        }
        if (indexMainLine < lyric.length && indexMainLine >= 0) {
          lyricRef.current.scrollTop = indexMainLine * 80 - 160;
          mainLine.current = lyricRef.current.children[indexMainLine];
          mainLine.current.style.color = "yellow";
        }
      } else {
        if (lyric) {
          if (mainLine.current) {
            mainLine.current.style.color = "white";
          }
          let indexMainLine = -1;
          for (let i in lyric) {
            if (lyric[i].startTime / 1000 > LocalStorage.get("timecmp3", 0)) {
              indexMainLine = i * 1 - 1;
              break;
            }
          }
          lyricRef.current.scrollTop = indexMainLine * 80 - 160;
          mainLine.current = lyricRef.current.children[indexMainLine];
          mainLine.current.style.color = "yellow";
        }
        clearInterval(lyricInterval);
      }
    }, 500);
    return () => {
      clearInterval(lyricInterval);
    };
  }, [globalState.isPlay]);

  return (
    <div className={cx("wrapper")} ref={lyricRef}>
      {lyric ? (
        lyric.map((line, index) => {
          return (
            <div className={cx("line")} key={index}>
              {line.data}
            </div>
          );
        })
      ) : (
        <div className={cx("nolyric")}>Chưa có lời bài hát</div>
      )}
    </div>
  );
}
export default memo(Lyric);
