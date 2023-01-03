import style from "./MVview.module.scss";
import classNames from "classnames/bind";
import { GlobalContext } from "../GlobalState";
import { useContext, useEffect, useState } from "react";
import services from "../../services";
import urlMedia from "../../tools/urlMedia";
import Video from "./Video";
import Popper from "../../Component/Popper";

let cx = classNames.bind(style);
function MVview() {
  let [globalState, dispatch] = useContext(GlobalContext);
  let [dataMV, setDataMV] = useState(null);

  useEffect(() => {
    async function getDataMV() {
      setDataMV(await services.getVideo({ encodeId: globalState.mvEncodeId }));
    }
    getDataMV();
  }, [globalState.mvEncodeId]);
  useEffect(() => {
    if (globalState.MVview) {
      document.querySelector("#audio").pause();
      dispatch({ type: "isPlay", payload: { isPlay: false } });
    }
  }, [globalState.MVview]);
  return (
    <>
      {globalState.MVview && dataMV && (
        <div className={cx("wrapper")} id="mvview">
          <div
            className={cx("background")}
            style={{ backgroundImage: `url(${dataMV.thumbnailM})` }}
          ></div>
          <div className={cx("heading")}>
            <div className={cx("info")}>
              <img src={dataMV.artist.thumbnail}></img>
              <div>
                <h5>{dataMV.title}</h5>
                <h6>{dataMV.artistsNames}</h6>
              </div>
            </div>
            <Popper content={"Đóng"}>
              <button
                onClick={(e) => {
                  document.querySelector("#mvview").className = cx([
                    "wrapper",
                    "hide",
                  ]);
                  setTimeout(() => {
                    dispatch({ type: "MVview", payload: { MVview: false } });
                  }, 400);
                }}
                className={cx("closeBtn")}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </Popper>
          </div>
          <div className={cx("content")}>
            <Video src={urlMedia.video(dataMV.encodeId, 720)} cx={cx}></Video>
            <div className={cx("recommends")}>
              {dataMV.recommends.map((item, index) => {
                return (
                  <div key={index} className={cx("reccommendItem")}>
                    <div
                      className={cx("thumbnail")}
                      onClick={() => {
                        dispatch({
                          type: "mvEncodeId",
                          payload: { mvEncodeId: item.encodeId },
                        });
                      }}
                    >
                      <img src={item.thumbnail}></img>
                      <div className={cx("control")}>
                        <i className="fa-solid fa-play"></i>
                      </div>
                    </div>
                    <div className={cx("info")}>
                      <h5>{item.title}</h5>
                      <h6>{item.artistsNames}</h6>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default MVview;
