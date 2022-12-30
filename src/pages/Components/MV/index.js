import style from "./MV.module.scss";
import cpnStyle from "../Components.module.scss";
import classNames from "classnames/bind";
import { GlobalContext } from "../../../Component/GlobalState";
import { useContext, useState } from "react";
import SongPopper from "../../../Component/SongPopper";
import nomalizeTime from "../../../tools/nomalizeTime";

let cx = classNames.bind(style);
let cxCpn = classNames.bind(cpnStyle);
function MV({ data, maxItem }) {
  let [globalState, dispatch] = useContext(GlobalContext);

  return (
    <div className={`${cxCpn("view-item")} ${cx("wrapper")}`}>
      <h3>{data.title}</h3>
      <div className={cx("container")}>
        {data.items.map((mv, index) => {
          if (maxItem) {
            if (index >= maxItem) {
              return;
            }
          }
          return (
            <div className={cx("mv")} key={index}>
              <div className={cx("thumbnail")}>
                <div className={cx("control")}>
                  <button>
                    <i className="fa-solid fa-play"></i>
                  </button>
                </div>
                <img src={mv.thumbnailM}></img>
              </div>
              <div className={cx("info")}>
                <img src={mv.artist.thumbnail}></img>
                <div>
                  <h5>{mv.title}</h5>
                  <h6>{mv.artistsNames}</h6>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default MV;
