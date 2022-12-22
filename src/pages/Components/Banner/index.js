import { useRef, useContext, useState, useCallback, memo } from "react";
import { GlobalContext } from "../../../Component/GlobalState";
import services from "../../../services";
import style from "./Banner.module.scss";
import cpnStyle from "../Components.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(style);
let cxCpn = classNames.bind(cpnStyle);
function Banner({ data }) {
  console.log(data);
  let [globalState, dispatch] = useContext(GlobalContext);
  let bannerRef = useRef();
  function ListBanner() {
    return data.items.map((banner, index) => {
      async function handleChangeCurrentSong(e, encodeId, type) {
        if (type == 1) {
          let currentSong = await services.getInfoSong({ encodeId });
          dispatch({ type: "currentSong", payload: { currentSong } });
        }
      }
      return (
        <div
          key={index}
          className={cx("banner-item")}
          onClick={(e) =>
            handleChangeCurrentSong(e, banner.encodeId, banner.type)
          }
        >
          <img src={banner.banner}></img>
        </div>
      );
    });
  }

  function hanleScrollLeft() {
    bannerRef.current.scrollLeft -= 314;
  }
  function hanleScrollRight() {
    bannerRef.current.scrollLeft += 314;
  }
  return (
    <div className={`${cxCpn("view-item")} ${cx("wrapper")}`}>
      <span
        className={cx(["material-symbols-outlined", "prev"])}
        onClick={hanleScrollLeft}
      >
        arrow_back_ios
      </span>
      <span
        className={cx(["material-symbols-outlined", "next"])}
        onClick={hanleScrollRight}
      >
        arrow_forward_ios
      </span>
      <div className={cx("list-banner")} ref={bannerRef}>
        <ListBanner></ListBanner>
      </div>
    </div>
  );
}
export default memo(Banner);
