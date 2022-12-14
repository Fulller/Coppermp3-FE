import style from "./Playlist.module.scss";
import cpnStyle from "../Components.module.scss";
import classNames from "classnames/bind";
import { GlobalContext } from "../../../Component/GlobalState";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AllBtn from "../AllBtn";
import MVicon from "../../../Component/MVicon";
import LinkArtistName from "../../../Component/LinkArtistName";
import LocalStorage from "../../../tools/localStorage";

let cx = classNames.bind(style);
let cxCpn = classNames.bind(cpnStyle);
function Playlist({ data, maxItem = 4, allBtnHandle, hasAllBtn = false }) {
  let [globalState, dispatch] = useContext(GlobalContext);
  return (
    <div className={`${cxCpn("view-item")} ${cx("wrapper")}`}>
      <div className={cxCpn("heading")}>
        <h3>{data.title.toUpperCase()}</h3>
        {hasAllBtn && <AllBtn hanleClick={allBtnHandle}></AllBtn>}
      </div>
      <div className={cx("playlists")}>
        {data.items.map((playlist, index) => {
          if (index >= maxItem) {
            return;
          }
          return (
            <div
              key={index}
              className={cx("playlist-item")}
              onClick={() => {
                let historyPlaylist = LocalStorage.get(
                  "historyPlaylistcmp3",
                  []
                );
                if (
                  !historyPlaylist.some((pl) => {
                    return pl.encodeId == playlist.encodeId;
                  })
                ) {
                  if (historyPlaylist.length >= 50) {
                    historyPlaylist.pop();
                  }
                  historyPlaylist.unshift(playlist);
                  LocalStorage.set("historyPlaylistcmp3", historyPlaylist);
                }
                dispatch({
                  type: "playlistEncodeId",
                  payload: { playlistEncodeId: playlist.encodeId },
                });
              }}
            >
              <Link to="/playlist">
                <div className={cx("content")}>
                  <img src={playlist.thumbnailM}></img>
                  <div className={cx("control")}>
                    <span className={cx(["material-symbols-outlined", "play"])}>
                      play_arrow
                    </span>
                  </div>
                </div>
                <h5>{playlist.title}</h5>
                {playlist.sortDescription ? (
                  <h6>{playlist.sortDescription}</h6>
                ) : (
                  <></>
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Playlist;
