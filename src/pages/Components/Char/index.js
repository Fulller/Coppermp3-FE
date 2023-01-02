import style from "./Char.module.scss";
import classNames from "classnames/bind";
import cpnStyle from "../Components.module.scss";
import Thumbnail, { cxThumbnail } from "../../Components/Thumbnail";
import { GlobalContext } from "../../../Component/GlobalState";
import { useContext, useRef, useState } from "react";
import nomalizeTime from "../../../tools/nomalizeTime";
import MVicon from "../../../Component/MVicon";
import LyricBtn from "../../../Component/LyricBtn";
import SongPopper from "../../../Component/SongPopper";

let cxCpn = classNames.bind(cpnStyle);
let cx = classNames.bind(style);
function Char({ data, title }) {
  let [globalState, dispatch] = useContext(GlobalContext);
  let [fullItem, setFullItem] = useState(false);
  return (
    <div className={`${cxCpn("view-item")} ${cx("wrapper")}`}>
      <h2 className={cx("title")}>{title}</h2>
      <div className={cx("content")}>
        {data.map((item, index) => {
          if (!fullItem && index >= 5) {
            return;
          }
          let classRating = ["rating"];
          if (index <= 2) {
            classRating.push("rating" + (index + 1));
          }
          return (
            <div
              key={index}
              className={
                cx([
                  "item",
                  globalState.currentSong.encodeId == item.encodeId
                    ? "active"
                    : "",
                ]) +
                " " +
                cxThumbnail([
                  "item",
                  globalState.currentSong.encodeId == item.encodeId
                    ? "active"
                    : "",
                ])
              }
            >
              <span className={cx(classRating)}>{index + 1}</span>
              <span className={cx("space", "material-symbols-outlined")}>
                remove
              </span>
              <div className={cx("info")}>
                <Thumbnail
                  size={50}
                  src={item.thumbnail}
                  dataSong={item}
                  playList={data}
                ></Thumbnail>
                <div className={cx("title")}>
                  <h5>{item.title}</h5>
                  <h6>{item.artistsNames}</h6>
                </div>
              </div>
              <div className={cx("album")}>
                {item.album ? item.album.title : ""}
              </div>
              <div className={cx("option")}>
                <span className={cx("unhover")}>
                  {nomalizeTime(item.duration)}
                </span>
                <div className={cx("hover")}>
                  <MVicon data={item}></MVicon>
                  <LyricBtn data={item} playList={data}></LyricBtn>
                  <SongPopper song={item}></SongPopper>
                </div>
              </div>
            </div>
          );
        })}
        <button
          className={cx("seeAll")}
          onClick={() => {
            setFullItem(!fullItem);
          }}
        >
          {fullItem ? "Thu gọn" : "Xem tất cả"}
        </button>
      </div>
    </div>
  );
}
export default Char;
