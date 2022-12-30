import style from "./Artist.module.scss";
import cpnStyle from "../Components.module.scss";
import classNames from "classnames/bind";
import { GlobalContext } from "../../../Component/GlobalState";
import { useContext, useState } from "react";

let cx = classNames.bind(style);
let cxCpn = classNames.bind(cpnStyle);
function Artist({ data, maxItem = 4 }) {
  let [globalState, dispatch] = useContext(GlobalContext);

  return (
    <div className={`${cxCpn("view-item")} ${cx("wrapper")}`}>
      <h3>{data.title}</h3>
      <div className={cx("container")}>
        {data.items.map((artist, index) => {
          if (index >= maxItem) {
            return;
          }
          return (
            <div className={cx("artist")} key={index}>
              <div className={cx("thumbnail")}>
                <img src={artist.thumbnail}></img>
                <div className={cx("control")}>
                  <button>
                    <i class="fa-solid fa-shuffle"></i>
                  </button>
                </div>
              </div>
              <div className={cx("info")}>
                <h5>{artist.name}</h5>
                <h6>{artist.totalFollow} quan tâm</h6>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Artist;