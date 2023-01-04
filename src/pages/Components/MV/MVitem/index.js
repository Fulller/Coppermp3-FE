import style from "./MVitem.module.scss";
import classNames from "classnames/bind";
import nomalizeTime from "../../../../tools/nomalizeTime";
import { GlobalContext } from "../../../../Component/GlobalState";
import { useContext } from "react";
import LinkArtistName from "../../../../Component/LinkArtistName";

let cx = classNames.bind(style);
function MVitem({ mv, key }) {
  let [globalState, dispatch] = useContext(GlobalContext);
  return (
    <div className={cx("mv")} key={key}>
      <div
        className={cx("thumbnail")}
        onClick={() => {
          dispatch({
            type: "mvEncodeId",
            payload: { mvEncodeId: mv.encodeId },
          });
          dispatch({ type: "MVview", payload: { MVview: true } });
        }}
      >
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
            <LinkArtistName data={mv.artists}></LinkArtistName>
          </div>
        </div>
      )}
    </div>
  );
}

export default MVitem;
