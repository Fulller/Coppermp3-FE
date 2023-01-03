import style from "./WeekChartBanner.module.scss";
import cpnStyle from "../Components.module.scss";
import classNames from "classnames/bind";
import { GlobalContext } from "../../../Component/GlobalState";
import { useContext } from "react";
import { Link } from "react-router-dom";
import LocalStorage from "../../../tools/localStorage";

let cx = classNames.bind(style);
let cxCpn = classNames.bind(cpnStyle);
function WeekChartBanner({ data }) {
  let [globalState, dispatch] = useContext(GlobalContext);
  return (
    <div className={`${cxCpn("view-item")} ${cx("wrapper")}`}>
      {data.items.map((item, index) => {
        return (
          <Link
            className={cx("item")}
            key={index}
            to="/weekchart"
            onClick={() => {
              LocalStorage.set("WeekChartAreacmp3", item.country);
            }}
          >
            <img src={item.cover}></img>
          </Link>
        );
      })}
    </div>
  );
}
export default WeekChartBanner;
