import classNames from "classnames/bind";
import cpnStyle from "../Components.module.scss";
import style from "./WeekChart.module.scss";
import { GlobalContext } from "../../../Component/GlobalState";
import { useContext, useRef, useState } from "react";
import Thumbnail, { cxThumbnail } from "../../Components/Thumbnail";
import nomalizeTime from "../../../tools/nomalizeTime";
import MVicon from "../../../Component/MVicon";
import LyricBtn from "../../../Component/LyricBtn";
import SongPopper from "../../../Component/SongPopper";
import { Link } from "react-router-dom";
import LocalStorage from "../../../tools/localStorage";
import LinkArtistName from "../../../Component/LinkArtistName";

let cxCpn = classNames.bind(cpnStyle);
let cx = classNames.bind(style);
function WeekChart({ data, title }) {
  let [globalState, dispatch] = useContext(GlobalContext);

  function Area({ dataArea, titleArea, idArea }) {
    return (
      <div className={cx("area")}>
        <h3 className={cx("area-title")}>{titleArea}</h3>
        <div className={cx("area-list")}>
          {dataArea.items.map((item, index) => {
            if (index >= 5) {
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
                <div className={cx("info")}>
                  <Thumbnail
                    size={40}
                    src={item.thumbnail}
                    dataSong={item}
                    playList={dataArea.items}
                  ></Thumbnail>
                  <div className={cx("title")}>
                    <h5>{item.title}</h5>
                    <LinkArtistName data={item.artists}></LinkArtistName>
                  </div>
                </div>

                <div className={cx("option")}>
                  <span className={cx("unhover")}>
                    {nomalizeTime(item.duration)}
                  </span>
                  <div className={cx("hover")}>
                    <MVicon data={item}></MVicon>
                    <LyricBtn data={item} playList={dataArea.items}></LyricBtn>
                    <SongPopper song={item}></SongPopper>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Link
          className={cx("seeAllBtn")}
          to="/weekchart"
          onClick={(e) => {
            LocalStorage.set("WeekChartAreacmp3", idArea);
          }}
        >
          Xem tất cả
        </Link>
      </div>
    );
  }
  return (
    <div className={`${cxCpn("view-item")} ${cx("wrapper")}`}>
      <h2 className={cx("titleParent")}>{title}</h2>
      <div className={cx("content")}>
        <Area dataArea={data.vn} titleArea="Việt Nam" idArea="vn"></Area>
        <Area dataArea={data.us} titleArea="US-UK" idArea="us"></Area>
        <Area dataArea={data.korea} titleArea="K-Pop" idArea="korea"></Area>
      </div>
      <div className={cx("background")}></div>
    </div>
  );
}
export default WeekChart;
