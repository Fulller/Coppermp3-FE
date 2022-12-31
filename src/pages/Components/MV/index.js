import style from "./MV.module.scss";
import cpnStyle from "../Components.module.scss";
import classNames from "classnames/bind";
import { GlobalContext } from "../../../Component/GlobalState";
import { useContext, useState } from "react";
import SongPopper from "../../../Component/SongPopper";
import nomalizeTime from "../../../tools/nomalizeTime";
import AllBtn from "../AllBtn";
import MVitem from "./MVitem";

let cx = classNames.bind(style);
let cxCpn = classNames.bind(cpnStyle);
function MV({ data, maxItem, allBtnHandle, hasAllBtn = false }) {
  let [globalState, dispatch] = useContext(GlobalContext);

  return (
    <div className={`${cxCpn("view-item")} ${cx("wrapper")}`}>
      <div className={cxCpn("heading")}>
        <h3>{data.title}</h3>
        {hasAllBtn && <AllBtn hanleClick={allBtnHandle}></AllBtn>}
      </div>
      <div className={cx("container")}>
        {data.items.map((mv, index) => {
          if (maxItem) {
            if (index >= maxItem) {
              return;
            }
          }
          return <MVitem mv={mv} key={index}></MVitem>;
        })}
      </div>
    </div>
  );
}
export default MV;
