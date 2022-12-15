import style from "./Info.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(style);
function Info({ globalState, dispatch }) {
  let cs = globalState.currentSong;
  return (
    <div className={cx("wrapper")}>
      <img src={cs.thumbnail}></img>
      <div>
        <span className={cx("title")}>{cs.title}</span>
        <span className={cx("artist")}>{cs.artistsNames}</span>
      </div>
    </div>
  );
}
export default Info;
