import { useState, useContext } from "react";
import { GlobalContext } from "../../../Component/GlobalState";
import SongPopper from "../../../Component/SongPopper";
import Thumbnail, { cxThumbnail } from "../Thumbnail";
import classNames from "classnames/bind";
import style from "./NewRelease.module.scss";
import cpnStyle from "../Components.module.scss";
import AllBtn from "../AllBtn";
import MVicon from "../../../Component/MVicon";

let cx = classNames.bind(style);
let cxCpn = classNames.bind(cpnStyle);
function NewRelease({ data }) {
  let [globalState, dispatch] = useContext(GlobalContext);
  let [option, setOption] = useState("all");
  let [popperIsShow, setPopperIsShow] = useState("all-1");
  let listOption = [
    {
      id: "all",
      title: "TẤT CẢ",
    },
    {
      id: "vPop",
      title: "VIỆT NAM",
    },
    {
      id: "others",
      title: "QUỐC TẾ",
    },
  ];
  return (
    <div className={`${cxCpn("view-item")} ${cx("wrapper")}`}>
      <div className={cxCpn("heading")}>
        <h3>{data.title.toUpperCase()}</h3>
      </div>
      <div className={cx("list-option")}>
        {listOption.map((optional, index) => {
          return (
            <button
              key={index}
              className={cx(optional.id == option ? "active" : "")}
              onClick={() => {
                setOption(optional.id);
              }}
            >
              {optional.title}
            </button>
          );
        })}
      </div>
      <div className={cx("list-song")}>
        {data.items[option].map((song, index) => {
          if (index >= 21) {
            return;
          }
          return (
            <div
              className={
                cx([
                  "item",
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
                size={60}
                playList={data.items[option]}
              ></Thumbnail>
              <div className={cx("info")}>
                <h4>{song.title}</h4>
                <h5>{song.artistsNames}</h5>
              </div>
              <span className={cx("option")}>
                <MVicon data={song}></MVicon>
                <SongPopper song={song}></SongPopper>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default NewRelease;
