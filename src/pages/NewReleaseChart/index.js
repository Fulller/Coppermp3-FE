import classNames from "classnames/bind";
import cpnStyle from "../Components/Components.module.scss";
import style from "./NewRealeaseChart.module.scss";
import services from "../../services";
import { useEffect, useState, useContext } from "react";
import LocalStorage from "../../tools/localStorage";
import Char from "../Components/Char";
import { GlobalContext } from "../../Component/GlobalState";
import Loading from "../Components/Loading";
import { useSelector } from "react-redux";
import selector from "../../redux/selector";

let cx = classNames.bind(style);
let cxCpn = classNames.bind(cpnStyle);
function NewReleaseChart() {
  let data = useSelector(selector.zingchart);
  let [globalState, dispatch] = useContext(GlobalContext);
  useEffect(() => {
    if (globalState.pageId != "newReleaseChart") {
      dispatch({
        type: "changePageActiveId",
        payload: { pageId: "newReleaseChart" },
      });
    }
  }, []);

  return (
    <>
      {data ? (
        <div className={cxCpn(["wrapper", "padding"]) + " " + cx("wrapper")}>
          <h2>Nhạc mới</h2>
          {data && (
            <Char data={data.newRelease} full={true} type="type2"></Char>
          )}
        </div>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
}
export default NewReleaseChart;
