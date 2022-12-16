import { useState, useRef, useContext, useEffect } from "react";
import style from "./Home.module.scss";
import classNames from "classnames/bind";
import { GlobalContext } from "../../Component/GlobalState";
import services from "../../services";
import urlMedia from "../../tools/urlMedia";

let cx = classNames.bind(style);
function Home() {
  let [globalState, dispatch] = useContext(GlobalContext);
  useEffect(() => {
    if (!globalState.isLogin) {
      window.location.href = "/login";
    }
  }, [globalState]);
  useEffect(() => {
    async function fetchData() {
      let newdata = await services.getChartHome();
      console.log(newdata);
    }
    fetchData();
  }, []);
  return <div className={cx("wrapper")}></div>;
}
export default Home;
