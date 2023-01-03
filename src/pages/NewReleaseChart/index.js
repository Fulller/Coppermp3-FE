import classNames from "classnames/bind";
import cpnStyle from "../Components/Components.module.scss";
import style from "./NewRealeaseChart.module.scss";
import services from "../../services";
import { useEffect, useState } from "react";
import LocalStorage from "../../tools/localStorage";
import Char from "../Components/Char";

let cx = classNames.bind(style);
let cxCpn = classNames.bind(cpnStyle);
function NewReleaseChart() {
  let [data, setData] = useState(null);
  useEffect(() => {
    async function getData() {
      setData(await services.getChartHome());
    }
    getData();
  }, []);

  return (
    <div className={cxCpn("wrapper") + " " + cx("wrapper")}>
      <h2>Nhạc mới</h2>
      {data && <Char data={data.newRelease} full={true} type="type2"></Char>}
    </div>
  );
}
export default NewReleaseChart;
