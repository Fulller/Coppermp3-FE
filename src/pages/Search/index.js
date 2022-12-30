import { useState, useRef, useContext, useEffect, memo } from "react";
import classNames from "classnames/bind";
import services from "../../services";
import urlMedia from "../../tools/urlMedia";
import { Playlist, Songs, MV, Artist } from "../Components";
import { GlobalContext } from "../../Component/GlobalState";
import style from "./Search.module.scss";
import LocalStorage from "../../tools/localStorage";
import cpnStyle from "../Components/Components.module.scss";
let cxCpn = classNames.bind(cpnStyle);
let cx = classNames.bind(style);
function Search() {
  let [dataSearch, setDataSearch] = useState(null);
  let [globalState, dispatch] = useContext(GlobalContext);
  let [navbarOption, setNavbarOption] = useState(
    LocalStorage.get("searchOption", "all")
  );
  let navbarOptions = [
    {
      title: "TẤT CẢ",
      id: "all",
    },
    {
      title: "BÀI HÁT",
      id: "song",
    },
    {
      title: "PLAYLIST/ALBUM",
      id: "playlist",
    },
    {
      title: "NGHỆ SĨ/OA",
      id: "artist",
    },
    {
      title: "MV",
      id: "mv",
    },
  ];
  useEffect(() => {
    async function fetchData() {
      let newDataSearch = await services.search({ query: globalState.search });
      setDataSearch(newDataSearch);
    }
    fetchData();
  }, [globalState.search]);

  function SearchView() {
    let optionView = {
      all: (
        <>
          {dataSearch.songs && (
            <Songs
              data={{ title: "Bài Hát", items: dataSearch.songs }}
              maxItem={8}
            ></Songs>
          )}
          {dataSearch.playlists && (
            <Playlist
              data={{ title: "Playlist/Album", items: dataSearch.playlists }}
            ></Playlist>
          )}
          {dataSearch.videos && (
            <MV
              data={{ title: "MV", items: dataSearch.videos }}
              maxItem={6}
            ></MV>
          )}
          {dataSearch.artists && (
            <Artist
              data={{ title: "NGHỆ SĨ/OA", items: dataSearch.artists }}
              maxItem={4}
            ></Artist>
          )}
          ),
        </>
      ),
      song: (
        <>
          {dataSearch.songs && (
            <Songs
              data={{ title: "Bài Hát", items: dataSearch.songs }}
              maxItem={20}
              column={1}
            ></Songs>
          )}
        </>
      ),
      playlist: (
        <>
          {dataSearch.playlists && (
            <Playlist
              data={{ title: "Playlist/Album", items: dataSearch.playlists }}
              maxItem={20}
            ></Playlist>
          )}
        </>
      ),
      artist: (
        <>
          {dataSearch.artists && (
            <Artist
              data={{ title: "NGHỆ SĨ/OA", items: dataSearch.artists }}
              maxItem={8}
            ></Artist>
          )}
        </>
      ),
      mv: (
        <>
          {" "}
          {dataSearch.videos && (
            <MV
              data={{ title: "MV", items: dataSearch.videos }}
              maxItem={12}
            ></MV>
          )}
        </>
      ),
    };
    return (
      <>
        <div className={cx("heading")}>
          <h2>Kết quả tìm kiếm</h2>
          <div className={cx("land")}></div>
          <div className={cx("navbar")}>
            {navbarOptions.map((option, index) => {
              return (
                <button
                  className={cx(navbarOption == option.id && "active")}
                  key={index}
                  onClick={() => {
                    LocalStorage.set("searchOption", option.id);
                    setNavbarOption(option.id);
                  }}
                >
                  {option.title}
                </button>
              );
            })}
          </div>
        </div>
        <>{optionView[navbarOption]}</>
      </>
    );
  }
  return (
    <div className={cxCpn(["wrapper"])}>
      {dataSearch && <SearchView></SearchView>}
    </div>
  );
}
export default Search;
