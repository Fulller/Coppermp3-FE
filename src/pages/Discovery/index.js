import { useState, useRef, useContext, useEffect, memo } from "react";
import classNames from "classnames/bind";
import services from "../../services";
import urlMedia from "../../tools/urlMedia";
import Loading from "../Components/Loading";
import {
  Banner,
  NewRelease,
  Playlist,
  RTchar,
  NewReleaseChart,
  ArtistSpotlight,
  WeekChartBanner,
} from "../Components";
import { GlobalContext } from "../../Component/GlobalState";

import cpnStyle from "../Components/Components.module.scss";
let cxCpn = classNames.bind(cpnStyle);
function Discovery() {
  let [dataDiscovery, setDataDiscovery] = useState(null);
  let [globalState, dispatch] = useContext(GlobalContext);
  useEffect(() => {
    if (globalState.pageId != "discovery") {
      dispatch({
        type: "changePageActiveId",
        payload: { pageId: "discovery" },
      });
    }
    async function fetchData() {
      let newDataHome = await services.getHome();
      setDataDiscovery(newDataHome.items);
    }
    fetchData();
  }, []);
  function DiscoveryView() {
    if (Object.keys(dataDiscovery).length > 0) {
      return dataDiscovery.map((dataBlock, index) => {
        switch (dataBlock.sectionType) {
          case "banner": {
            return <Banner data={dataBlock} key={index}></Banner>;
          }
          case "new-release":
            return <NewRelease data={dataBlock} key={index}></NewRelease>;
          case "playlist":
            return <Playlist data={dataBlock} key={index}></Playlist>;
          case "RTChart":
            return <RTchar data={dataBlock} key={index}></RTchar>;
          case "newReleaseChart":
            return (
              <NewReleaseChart data={dataBlock} key={index}></NewReleaseChart>
            );
          case "weekChart":
            return (
              <WeekChartBanner data={dataBlock} key={index}></WeekChartBanner>
            );

          default:
        }
      });
    }
  }
  return (
    <>
      {dataDiscovery ? (
        <div className={cxCpn("wrapper")}>
          <DiscoveryView></DiscoveryView>
        </div>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
}
export default Discovery;
