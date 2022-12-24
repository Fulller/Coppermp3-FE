import style from "./Player.module.scss";
import classNames from "classnames/bind";
import Control from "./Components/Control/Control";
import Info from "./Components/Info";
import Option from "./Components/Option";
import Detailplayer from "./Components/DetailPlayer";
import { useContext, useState } from "react";
import { GlobalContext } from "../../../Component/GlobalState";

let cx = classNames.bind(style);
function Player() {
  let [globalState, dispatch] = useContext(GlobalContext);
  let [showDetailPlayer, setShowDetailPlayer] = useState(false);
  return (
    <div className={cx("wrapper")}>
      <Info globalState={globalState} dispatch={dispatch}></Info>
      <Detailplayer
        globalState={globalState}
        dispatch={dispatch}
        setShowDetailPlayer={setShowDetailPlayer}
        showDetailPlayer={showDetailPlayer}
      >
        <Control globalState={globalState} dispatch={dispatch}></Control>
      </Detailplayer>
      <Option
        globalState={globalState}
        dispatch={dispatch}
        setShowDetailPlayer={setShowDetailPlayer}
        showDetailPlayer={showDetailPlayer}
      ></Option>
    </div>
  );
}
export default Player;
