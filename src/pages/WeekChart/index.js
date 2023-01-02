import classNames from "classnames/bind";
import cpnStyle from "../Components/Components.module.scss";
import services from "../../services";
import { useEffect, useState } from "react";
import Char from "../Components/Char";
import LocalStorage from "../../tools/localStorage";

let cxCpn = classNames.bind(cpnStyle);
function WeekChart() {
  let [data, setData] = useState(null);
  let [areaOption, setAreaOption] = useState(
    LocalStorage.get("WeekChartAreacmp3", "vn")
  );
  useEffect(() => {
    async function getData() {
      setData(await services.getChartHome());
    }
    getData();
  }, []);
  return (
    <div className={cxCpn("wrapper")}>
      <h3>{areaOption}</h3>
    </div>
  );
}
export default WeekChart;
