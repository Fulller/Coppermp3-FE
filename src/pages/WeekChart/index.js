import classNames from "classnames/bind";
import cpnStyle from "../Components/Components.module.scss";
import style from "./WeekChart.module.scss";
import services from "../../services";
import { useEffect, useState } from "react";
import LocalStorage from "../../tools/localStorage";
import Char from "../Components/Char";

let cx = classNames.bind(style);
let cxCpn = classNames.bind(cpnStyle);
function WeekChart() {
  let [data, setData] = useState(null);
  let [areaOption, setAreaOption] = useState(
    LocalStorage.get("WeekChartAreacmp3", "vn")
  );
  let optionAreaS = [
    { title: "VIỆT NAM", id: "vn" },
    { title: "US-UK", id: "us" },
    { title: "K-POP", id: "korea" },
  ];
  useEffect(() => {
    async function getData() {
      setData(await services.getChartHome());
    }
    getData();
  }, []);
  return (
    <div className={cxCpn("wrapper") + " " + cx("wrapper")}>
      <h2>Bảng Xếp Hạng Tuần</h2>
      <div className={cx("optionArea")}>
        {optionAreaS.map((area, index) => {
          return (
            <button
              key={index}
              className={cx(["option-item", areaOption == area.id && "active"])}
              onClick={() => {
                LocalStorage.set("WeekChartAreacmp3", area.id);
                setAreaOption(area.id);
              }}
            >
              {area.title}
            </button>
          );
        })}
      </div>
      {data && (
        <Char
          data={data.weekChart[areaOption].items}
          full={true}
          type="type2"
        ></Char>
      )}
    </div>
  );
}
export default WeekChart;
