import style from "./LyricBtn.module.scss";
import classNames from "classnames/bind";
import { GlobalContext } from "../GlobalState";
import { useContext } from "react";
import LocalStorage from "../../tools/localStorage";
import Popper from "../Popper";

let cx = classNames.bind(style);
function LyricBtn({ data, playList, playListEncodeId }) {
  let [globalState, dispatch] = useContext(GlobalContext);
  return (
    <Popper content={"Phát cùng lời bài hát"}>
      <button
        className={cx(["wrapper"])}
        onClick={() => {
          if (playList) {
            dispatch({
              type: "currentPlaylist",
              payload: { currentPlaylist: playList },
            });
          }
          dispatch({
            type: "currentSong",
            payload: { currentSong: { ...data, playListEncodeId } },
          });
          LocalStorage.set("detailOptionalcmp3", "lyric");
          document.querySelector("#showDetailBtn").click();
        }}
      >
        <i class="fa-solid fa-microphone-lines"></i>
      </button>
    </Popper>
  );
}
export default LyricBtn;
