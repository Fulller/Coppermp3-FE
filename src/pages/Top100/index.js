import { useState, useRef, useContext, useEffect, memo } from "react";
import classNames from "classnames/bind";
import services from "../../services";
import urlMedia from "../../tools/urlMedia";
import { Playlist, Songs, MV, Artist } from "../Components";
import GlobalState, { GlobalContext } from "../../Component/GlobalState";
import style from "./Top100.module.scss";
import LocalStorage from "../../tools/localStorage";
import cpnStyle from "../Components/Components.module.scss";
import Loading from "../Components/Loading";
import { useSelector } from "react-redux";
import selector from "../../redux/selector";

let cx = classNames.bind(style);
let cxCpn = classNames.bind(cpnStyle);
function Top100() {
  let [globalState, dispatch] = useContext(GlobalContext);
  let data = useSelector(selector.top100);
  useEffect(() => {
    if (globalState.pageId != "top100") {
      dispatch({
        type: "changePageActiveId",
        payload: { pageId: "top100" },
      });
    }
  }, []);

  function Sections() {
    return data.map((section, index) => {
      switch (section.sectionType) {
        case "playlist":
          return <Playlist data={section} maxItem={8}></Playlist>;
      }
    });
  }
  return (
    <>
      {data ? (
        <div className={cxCpn(["wrapper"]) + " " + cx("wrapper")}>
          {data && (
            <div
              className={cx("backgroundBanber")}
              style={{
                backgroundImage:
                  "url(https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.8.17/static/media/banner-100.33cafe6b.png)",
              }}
            >
              <div className={cx("upper")}>
                <span className={cx("top")}>TOP</span>
                <span className={cx("text100")}>100</span>
              </div>
            </div>
          )}
          {data && <Sections></Sections>}
        </div>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
}
export default Top100;
