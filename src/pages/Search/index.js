import { useState, useRef, useContext, useEffect, memo } from "react";
import classNames from "classnames/bind";
import services from "../../services";
import urlMedia from "../../tools/urlMedia";
import { Playlist, Songs } from "../Components";
import { GlobalContext } from "../../Component/GlobalState";

import cpnStyle from "../Components/Components.module.scss";
let cxCpn = classNames.bind(cpnStyle);
function Search() {
  let [dataSearch, setDataSearch] = useState(null);
  let [globalState, dispatch] = useContext(GlobalContext);
  useEffect(() => {
    async function fetchData() {
      let newDataSearch = await services.search({ query: globalState.search });
      setDataSearch(newDataSearch);
    }
    fetchData();
  }, [globalState.search]);

  function SearchView() {
    return (
      <>
        {dataSearch.songs && (
          <Songs
            data={{ title: "Bài Hát", items: dataSearch.songs }}
            maxSong={8}
          ></Songs>
        )}
        {dataSearch.playlists && (
          <Playlist
            data={{ title: "Playlist/Album", items: dataSearch.playlists }}
          ></Playlist>
        )}
      </>
    );
  }
  return (
    <div className={cxCpn("wrapper")}>
      {dataSearch && <SearchView></SearchView>}
    </div>
  );
}
export default Search;
