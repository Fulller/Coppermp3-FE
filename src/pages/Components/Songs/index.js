import style from "./Songs.module.scss";
import cpnStyle from "../Components.module.scss";
import classNames from "classnames/bind";
import { GlobalContext } from "../../../Component/GlobalState";
import { useContext, useState } from "react";
import Thumbnail, { cxThumbnail } from "../Thumbnail";
import SongPopper from "../../../Component/SongPopper";
import nomalizeTime from "../../../tools/nomalizeTime";

let cx = classNames.bind(style);
let cxCpn = classNames.bind(cpnStyle);
function Songs({ data, maxSong }) {
  let [globalState, dispatch] = useContext(GlobalContext);
  let [popperIsShow, setPopperIsShow] = useState("all-1");

  return (
    <div className={`${cxCpn("view-item")} ${cx("wrapper")}`}>
      <h3>{data.title}</h3>
      <div className={cx("container")}>
        {data.items.map((song, index) => {
          if (maxSong > 0) {
            if (index >= maxSong) {
              return;
            }
          }
          return (
            <div
              className={
                cx([
                  "song",
                  globalState.currentSong.encodeId == song.encodeId
                    ? "active"
                    : "",
                ]) +
                " " +
                cxThumbnail([
                  "item",
                  globalState.currentSong.encodeId == song.encodeId
                    ? "active"
                    : "",
                ])
              }
              key={index}
            >
              <Thumbnail
                src={song.thumbnail}
                dataSong={song}
                active={globalState.currentSong.encodeId == song.encodeId}
                size={50}
                playList={data.items}
              ></Thumbnail>
              <div className={cx("info")}>
                <h5>{song.title}</h5>
                <h6>{song.artistsNames}</h6>
              </div>
              <div className={cx("right")}>
                <div className={cx("feature")}>
                  <span className={cx("popper")}>
                    <SongPopper song={song}></SongPopper>
                  </span>
                </div>
                <span className={cx("duration")}>
                  {nomalizeTime(song.duration)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Songs;
