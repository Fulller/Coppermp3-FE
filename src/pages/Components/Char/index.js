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
import LinkArtistName from "../../../Component/LinkArtistName";
import LinkAlbum from "../../../Component/LinkAlbum";

let cxCpn = classNames.bind(cpnStyle);
let cx = classNames.bind(style);
function Char({ data, title, full = false, type = "type1" }) {
  let [globalState, dispatch] = useContext(GlobalContext);
  let [fullItem, setFullItem] = useState(full);
  return (
    <div className={`${cxCpn("view-item")} ${cx("wrapper")}`}>
      <h2 className={cx("title")}>{title}</h2>
      <div className={cx("content")}>
        {data.map((item, index) => {
          if (!fullItem && index >= 10) {
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
                  <LinkArtistName data={item.artists}></LinkArtistName>
                </div>
              </div>
              <LinkAlbum data={item.album}></LinkAlbum>
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
        {type == "type1" && (
          <button
            className={cx("seeAll")}
            onClick={() => {
              setFullItem(!fullItem);
            }}
          >
            {fullItem ? "Thu gọn" : "Xem top 100"}
          </button>
        )}
      </div>
    </div>
  );
}
export default Char;
