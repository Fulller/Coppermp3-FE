import style from "./Info.module.scss";
import classNames from "classnames/bind";
import { useEffect, useRef } from "react";

let cx = classNames.bind(style);
function Info({ globalState, dispatch }) {
  let cs = globalState.currentSong;
  let thumbnailRef = useRef();
  useEffect(() => {
    if (thumbnailRef.current) {
      thumbnailRef.current.animate(
        [{ transform: "scale(0)" }, { transform: "scale(1)" }],
        {
          duration: 300,
          iterations: 1,
        }
      );
    }
  }, [cs.thumbnail]);
  return (
    <div className={cx("wrapper")}>
      <img src={cs.thumbnail} ref={thumbnailRef}></img>
      <div>
        <span className={cx("title")}>{cs.title}</span>
        <span className={cx("artist")}>{cs.artistsNames}</span>
      </div>
    </div>
  );
}
export default Info;
