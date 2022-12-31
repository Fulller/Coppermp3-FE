import style from "./MVitem.module.scss";
import classNames from "classnames/bind";
import nomalizeTime from "../../../../tools/nomalizeTime";

let cx = classNames.bind(style);
function MVitem({ mv, key }) {
  return (
    <div className={cx("mv")} key={key}>
      <div className={cx("thumbnail")}>
        <div className={cx("control")}>
          <button>
            <i className="fa-solid fa-play"></i>
          </button>
        </div>
        <div className={cx("duration")}>{nomalizeTime(mv.duration)}</div>
        <img src={mv.thumbnailM}></img>
      </div>
      {mv.artist && (
        <div className={cx("info")}>
          <img src={mv.artist.thumbnail}></img>
          <div>
            <h5>{mv.title}</h5>
            <h6>{mv.artistsNames}</h6>
          </div>
        </div>
      )}
    </div>
  );
}

export default MVitem;
