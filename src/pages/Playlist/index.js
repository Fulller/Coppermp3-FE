import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../Component/GlobalState";
import services from "../../services";
import classNames from "classnames/bind";
import style from "./Playlist.module.scss";
import cpnStyle from "../Components/Components.module.scss";
import Thumbnail, { cxThumbnail } from "../Components/Thumbnail";
import MVicon from "../../Component/MVicon";
import SongPopper from "../../Component/SongPopper";
import LyricBtn from "../../Component/LyricBtn";
import LinkArtistName from "../../Component/LinkArtistName";
import LinkAlbum from "../../Component/LinkAlbum";
import Loading from "../Components/Loading";

let cx = classNames.bind(style);
let cxCpn = classNames.bind(cpnStyle);
function Playlist() {
  let [globalState, dispatch] = useContext(GlobalContext);
  let [playlistData, setPlaylistData] = useState(null);
  useEffect(() => {
    async function loadPlaylist() {
      let data = await services.getDetailPlaylist({
        encodeId: globalState.playlistEncodeId,
      });
      setPlaylistData(data);
    }
    loadPlaylist();
  }, [globalState.playlistEncodeId]);
  function InfoPlaylist({ data }) {
    return (
      <div className={cx("info")}>
        <div
          className={cx([
            "thumbnail",
            globalState.isPlay &&
            data.song.items.some((song) => {
              return globalState.currentSong.encodeId == song.encodeId;
            })
              ? "active"
              : "",
          ])}
        >
          <img src={data.thumbnailM}></img>
        </div>
        <div className={cx("name")}>
          <h5>{data.title}</h5>
          <h6>{data.artistsNames}</h6>
          <h6>{data.like} người yêu thích</h6>
        </div>
      </div>
    );
  }
  function ListSong({ data }) {
    if (Object.keys(data).length > 0) {
      return (
        <div className={cx("listsong")}>
          <div className={cx("heading")}>
            <span>BÀI HÁT</span>
            <span>ALBUM</span>
            <span>THỜI GIAN</span>
          </div>
          {data.song.items.map((item, index) => {
            function nomalizeTime(time) {
              if (isNaN(time)) {
                return "0:00";
              }
              let minus = Math.floor(time / 60).toString();
              let second = Math.floor(time % 60).toString();
              return `${minus.length == 1 ? "0" + minus : minus}:${
                second.length == 1 ? "0" + second : second
              }`;
            }
            return (
              <div
                className={
                  cx([
                    "item",
                    globalState.currentSong.encodeId == item.encodeId
                      ? "active"
                      : "",
                  ]) +
                  " " +
                  cxThumbnail([
                    "item",
                    globalState.currentSong.encodeId == item.encodeId
                      ? "active"
                      : "",
                  ])
                }
                key={index}
              >
                <Thumbnail
                  src={item.thumbnail}
                  size={50}
                  dataSong={item}
                  active={globalState.currentSong.encodeId == item.encodeId}
                  playList={playlistData.song.items}
                  playListEncodeId={playlistData.encodeId}
                ></Thumbnail>
                <div className={cx("info")}>
                  <h5>{item.title}</h5>
                  <LinkArtistName data={item.artists}></LinkArtistName>
                </div>
                <div className={cx("album")}>
                  <LinkAlbum data={item.album}></LinkAlbum>
                </div>
                <div className={cx("option")}>
                  <span className={cx("duration")}>
                    {nomalizeTime(item.duration)}
                  </span>
                  <div className={cx("opitionhover")}>
                    <MVicon data={item}></MVicon>
                    <LyricBtn
                      data={item}
                      playList={playlistData.song.items}
                      playListEncodeId={playlistData.encodeId}
                    ></LyricBtn>
                    <SongPopper song={item}></SongPopper>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  return (
    <>
      {playlistData ? (
        <div className={`${cxCpn("wrapper")} ${cx("wrapper")}`}>
          <InfoPlaylist data={playlistData}></InfoPlaylist>
          <ListSong data={playlistData}></ListSong>
        </div>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
}
export default Playlist;
