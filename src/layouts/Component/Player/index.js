import style from "./Player.module.scss";
import classNames from "classnames/bind";
import Control from "./Components/Control/Control";
import Info from "./Components/Info";
import Option from "./Components/Option";
import Detailplayer from "./Components/DetailPlayer";
import { useContext, useRef, useState } from "react";
import { GlobalContext } from "../../../Component/GlobalState";
import { Link } from "react-router-dom";
import { async } from "q";

let cx = classNames.bind(style);
function Player() {
  let [globalState, dispatch] = useContext(GlobalContext);
  let [showDetailPlayer, setShowDetailPlayer] = useState(false);
  let LinkRef = useRef();
  return (
    <div
      className={cx("wrapper")}
      onClick={(e) => {
        if (
          e.target == e.target.closest("." + cx("wrapper")) &&
          globalState.currentSong.playListEncodeId
        ) {
          dispatch({
            type: "playlistEncodeId",
            payload: {
              playlistEncodeId: globalState.currentSong.playListEncodeId,
            },
          });
          LinkRef.current.click();
        } else {
          e.preventDefault();
        }
      }}
    >
      <Link to="/playlist" ref={LinkRef} style={{ display: "none" }}></Link>
      <Info globalState={globalState} dispatch={dispatch}></Info>
      <Detailplayer
        globalState={globalState}
        dispatch={dispatch}
        setShowDetailPlayer={setShowDetailPlayer}
        showDetailPlayer={showDetailPlayer}
      >
        <Control
          globalState={globalState}
          dispatch={dispatch}
          showDetailPlayer={showDetailPlayer}
        ></Control>
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
