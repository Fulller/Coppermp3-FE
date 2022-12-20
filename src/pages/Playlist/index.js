import { useState, useContext, useEffect } from "react";
import style from "./Playlist.module.scss";
import classNames from "classnames/bind";
import { GlobalContext } from "../../Component/GlobalState";
import services from "../../services";

let cx = classNames.bind(this);
function Playlist() {
  let [globalState, dispatch] = useContext(GlobalContext);
  let [playlist, setPlaylist] = useState({});
  useEffect(() => {
    async function loadPlaylist() {
      let data = await services.getDetailPlaylist({
        encodeId: globalState.playlistEncodeId,
      });
      setPlaylist(data);
    }
    loadPlaylist();
  }, []);
  console.log(playlist);
  return <div>{JSON.stringify(playlist)}</div>;
}
export default Playlist;
