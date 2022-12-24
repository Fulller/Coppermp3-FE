import style from "./Player.module.scss";
import classNames from "classnames/bind";
import Control from "./Components/Control/Control";
import Info from "./Components/Info";
import Option from "./Components/Option";
import { useContext } from "react";
import { GlobalContext } from "../../../Component/GlobalState";

let cx = classNames.bind(style);
function Player() {
  let [globalState, dispatch] = useContext(GlobalContext);
  return (
    <div className={cx("wrapper")}>
      <Info globalState={globalState} dispatch={dispatch}></Info>
      <Control globalState={globalState} dispatch={dispatch}></Control>
      <Option globalState={globalState} dispatch={dispatch}></Option>
    </div>
  );
}
export default Player;
