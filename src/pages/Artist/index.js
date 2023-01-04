import { useState, useRef, useContext, useEffect, memo } from "react";
import classNames from "classnames/bind";
import services from "../../services";
import urlMedia from "../../tools/urlMedia";
import { Playlist, Songs, MV, Artist } from "../Components";
import GlobalState, { GlobalContext } from "../../Component/GlobalState";
import style from "./Artist.module.scss";
import LocalStorage from "../../tools/localStorage";
import cpnStyle from "../Components/Components.module.scss";

let cx = classNames.bind(style);
let cxCpn = classNames.bind(cpnStyle);
function ArtistInfo() {
  let [globalState, dispatch] = useContext(GlobalContext);
  let [data, setData] = useState(null);
  let [style, setStyle] = useState({});
  let wrapperRef = useRef();
  let biographyRef = useRef();
  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTop = 0;
    }
    async function fetchData() {
      setData(await services.getArtist({ name: globalState.artistName }));
    }
    fetchData();
  }, [globalState.artistName]);

  useEffect(() => {
    if (data) {
      if (data.cover.includes("default")) {
        setStyle({ backgroundImage: `url(${data.thumbnailM})` });
      } else {
        setStyle({ backgroundImage: `url(${data.cover})` });
      }
    }
  }, [data]);
  function Sections() {
    return data.sections.map((section, index) => {
      switch (section.sectionType) {
        case "song":
          return <Songs data={section} maxItem={6} hasAllBtn={true}></Songs>;
        case "playlist":
          return <Playlist data={section}></Playlist>;
        case "video":
          return <MV data={section} maxItem={3}></MV>;
        case "artist":
          return <Artist data={section}></Artist>;
      }
    });
  }
  return (
    <div ref={wrapperRef} className={cxCpn(["wrapper"]) + " " + cx("wrapper")}>
      {data && (
        <div className={cx("backgroundBanber")} style={{ ...style }}>
          <h1 className={cx("name")}>{data.name}</h1>
          <h2 className={cx("follow")}>{data.follow} người quan tâm</h2>
        </div>
      )}
      {data && <Sections></Sections>}
      {data && (
        <div className={cxCpn("view-item")} style={{ marginBottom: "24px" }}>
          <div className={cxCpn("heading")}>
            <h3>Về {data.name}</h3>
          </div>
          <div className={cx("container")}>
            <img src={data.thumbnailM}></img>
            <div className={cx("biography")}>
              <p ref={biographyRef}>
                {biographyRef.current &&
                  (biographyRef.current.innerHTML =
                    data.biography || data.sortBiography)}
              </p>
              <div className={cx("follow")}>
                <h4>{data.follow}</h4>
                <h5>Người quan tâm</h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ArtistInfo;
