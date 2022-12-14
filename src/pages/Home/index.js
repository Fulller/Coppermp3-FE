import { useState, useRef, useContext, useEffect } from "react";
import style from "./Home.module.scss";
import classNames from "classnames/bind";
import { GlobalContext } from "../../Component/GlobalState";
import services from "../../services";
import urlMedia from "../../tools/urlMedia";

let cx = classNames.bind(style);
function Home() {
  let [globalState, dispatch] = useContext(GlobalContext);
  let [data, setData] = useState();
  useEffect(() => {
    async function fetchData() {
      let newdata = await services.test();
      setData(newdata);
    }
    fetchData();
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="wrapper">
      <h1 className="haha">HOME PAGE</h1>
    </div>
  );
}
export default Home;
