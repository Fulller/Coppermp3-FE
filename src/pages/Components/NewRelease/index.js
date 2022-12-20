import { useState, useContext } from "react";
import { GlobalContext } from "../../../Component/GlobalState";
import SongPopper from "../../../Component/SongPopper";
import classNames from "classnames/bind";
import style from "./NewRelease.module.scss";
import cpnStyle from "../Components.module.scss";

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
      <h3>{data.title.toUpperCase()}</h3>
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
              className={cx([
                "song",
                globalState.currentSong.encodeId == song.encodeId
                  ? "isPlay"
                  : "",
              ])}
              key={index}
            >
              <img
                src={song.thumbnail}
                onClick={() =>
                  dispatch({
                    type: "currentSong",
                    payload: { currentSong: song },
                  })
                }
              ></img>
              <div className={cx("info")}>
                <h4>{song.title}</h4>
                <h5>{song.artistsNames}</h5>
              </div>
              <span>
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
