import classNames from "classnames/bind";
import cpnStyle from "../Components/Components.module.scss";
import services from "../../services";
import { useEffect, useState, useContext } from "react";
import Char from "../Components/Char";
import WeekChart from "../Components/WeekChart";
import { GlobalContext } from "../../Component/GlobalState";

let cxCpn = classNames.bind(cpnStyle);
function ZingChar() {
  let [data, setData] = useState(null);
  let [globalState, dispatch] = useContext(GlobalContext);
  useEffect(() => {
    if (globalState.pageId != "zingchart") {
      dispatch({
        type: "changePageActiveId",
        payload: { pageId: "zingchart" },
      });
    }
    async function getData() {
      setData(await services.getChartHome());
    }
    getData();
  }, []);
  return (
    <div className={cxCpn("wrapper")}>
      {data && <Char data={data.RTChart.items} title={"#zingchar"}></Char>}
      {data && (
        <WeekChart
          data={data.weekChart}
          title={"Bảng Xếp Hạng Tuần"}
        ></WeekChart>
      )}
    </div>
  );
}
export default ZingChar;
