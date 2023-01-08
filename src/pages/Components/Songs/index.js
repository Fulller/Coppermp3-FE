import style from "./Songs.module.scss";
import cpnStyle from "../Components.module.scss";
import classNames from "classnames/bind";
import { GlobalContext } from "../../../Component/GlobalState";
import { useContext, useState } from "react";
import Thumbnail, { cxThumbnail } from "../Thumbnail";
import SongPopper from "../../../Component/SongPopper";
import nomalizeTime from "../../../tools/nomalizeTime";
import AllBtn from "../AllBtn";
import MVicon from "../../../Component/MVicon";
import LyricBtn from "../../../Component/LyricBtn";
import LinkArtistName from "../../../Component/LinkArtistName";

let cx = classNames.bind(style);
let cxCpn = classNames.bind(cpnStyle);
function Songs({
  data,
  maxItem = 8,
  column = 2,
  allBtnHandle,
  hasAllBtn = false,
}) {
  let [globalState, dispatch] = useContext(GlobalContext);

  return (
    <div className={`${cxCpn("view-item")} ${cx("wrapper")}`}>
      <div className={cxCpn("heading")}>
        <h3>{data.title}</h3>
        {hasAllBtn && <AllBtn hanleClick={allBtnHandle}></AllBtn>}
      </div>
      <div
        className={cx("container")}
        style={{ gridTemplateColumns: `repeat(${column}, 1fr)` }}
      >
        {data.items.map((song, index) => {
          if (maxItem) {
            if (index >= maxItem) {
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
                size={50}
                playList={data.items}
              ></Thumbnail>
              <div className={cx("info")}>
                <h5 className={cx([column == 2 && "titlecl2"])}>
                  {song.title}
                </h5>
                <LinkArtistName data={song.artists}></LinkArtistName>
              </div>
              <div className={cx("right")}>
                <div className={cx("option")}>
                  <MVicon data={song}></MVicon>
                  <LyricBtn data={song} playList={data.items}></LyricBtn>
                  <SongPopper song={song}></SongPopper>
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
