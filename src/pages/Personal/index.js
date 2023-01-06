import { useState, useRef, useContext, useEffect, memo } from "react";
import classNames from "classnames/bind";
import services from "../../services";
import urlMedia from "../../tools/urlMedia";
import { Playlist, Songs, MV, Artist, Loading } from "../Components";
import { GlobalContext } from "../../Component/GlobalState";
import LocalStorage from "../../tools/localStorage";
import style from "./Personal.module.scss";
import cpnStyle from "../Components/Components.module.scss";

let cxCpn = classNames.bind(cpnStyle);
let cx = classNames.bind(style);
function Personal() {
  let historySong = LocalStorage.get("historySongcmp3", []);
  let historyPlaylist = LocalStorage.get("historyPlaylistcmp3", []);
  let [option, setOption] = useState("song");
  let [globalState, dispatch] = useContext(GlobalContext);
  let optionList = [
    {
      id: "song",
      title: "Bài hát đã nghe",
    },
    {
      id: "playlist",
      title: "Playlist đã nghe",
    },
  ];
  return (
    <div className={cxCpn("wrapper") + " " + cx("wrapper")}>
      <div className={cx("options")}>
        {optionList.map((optionItem, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setOption(optionItem.id);
              }}
              className={cx(["option", optionItem.id == option && "active"])}
            >
              {optionItem.title}
            </div>
          );
        })}
      </div>
      {option == "song" && (
        <Songs data={{ title: "", items: historySong }} maxItem={100}></Songs>
      )}
      {option == "playlist" && (
        <Playlist
          data={{ title: "", items: historyPlaylist }}
          maxItem={100}
        ></Playlist>
      )}
    </div>
  );
}
export default Personal;
