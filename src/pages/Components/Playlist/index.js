import style from "./Playlist.module.scss";
import cpnStyle from "../Components.module.scss";
import classNames from "classnames/bind";
import { GlobalContext } from "../../../Component/GlobalState";
import { useContext } from "react";
import { Link } from "react-router-dom";

let cx = classNames.bind(style);
let cxCpn = classNames.bind(cpnStyle);
function Playlist({ data }) {
  let [globalState, dispatch] = useContext(GlobalContext);
  return (
    <div className={`${cxCpn("view-item")} ${cx("wrapper")}`}>
      <h3>{data.title.toUpperCase()}</h3>
      <div className={cx("playlists")}>
        {data.items.map((playlist, index) => {
          if (
            index >= data.items.length - (data.items.length % 4) ||
            index >= 8
          ) {
            return;
          }
          return (
            <div
              key={index}
              className={cx("playlist-item")}
              onClick={() =>
                dispatch({
                  type: "playlistEncodeId",
                  payload: { playlistEncodeId: playlist.encodeId },
                })
              }
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
