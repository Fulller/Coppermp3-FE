import style from "./Artist.module.scss";
import cpnStyle from "../Components.module.scss";
import classNames from "classnames/bind";
import { GlobalContext } from "../../../Component/GlobalState";
import { useContext, useState } from "react";
import AllBtn from "../AllBtn";
import { Link } from "react-router-dom";

let cx = classNames.bind(style);
let cxCpn = classNames.bind(cpnStyle);
function Artist({ data, maxItem = 4, allBtnHandle }) {
  let [globalState, dispatch] = useContext(GlobalContext);

  return (
    <div className={`${cxCpn("view-item")} ${cx("wrapper")}`}>
      <div className={cxCpn("heading")}>
        <h3>{data.title}</h3>
        <AllBtn hanleClick={allBtnHandle}></AllBtn>
      </div>
      <div className={cx("container")}>
        {data.items.map((artist, index) => {
          if (index >= maxItem) {
            return;
          }
          return (
            <div className={cx("artist")} key={index}>
              <div
                className={cx("thumbnail")}
                onClick={() => {
                  dispatch({
                    type: "artistName",
                    payload: { artistName: artist.alias },
                  });
                }}
              >
                <img src={artist.thumbnail}></img>
                <Link to={"/artist"}>
                  <div className={cx("control")}>
                    <button>
                      <i className="fa-solid fa-shuffle"></i>
                    </button>
                  </div>
                </Link>
              </div>
              <div className={cx("info")}>
                <h5
                  onClick={() => {
                    dispatch({
                      type: "artistName",
                      payload: { artistName: artist.alias },
                    });
                  }}
                >
                  {artist.name}
                </h5>
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
