import style from "./RTchar.module.scss";
import cpnStyle from "../Components.module.scss";
import classNames from "classnames/bind";
import { GlobalContext } from "../../../Component/GlobalState";
import { useContext } from "react";
import services from "../../../services";
import Thumbnail, { cxThumbnail } from "../../Components/Thumbnail";

let cx = classNames.bind(style);
let cxCpn = classNames.bind(cpnStyle);
function RTchar({ data }) {
  let [globalState, dispatch] = useContext(GlobalContext);
  async function changeCurrentSong(encodeId) {
    let currentSong = await services.getInfoSong({ encodeId });
    dispatch({ type: "currentSong", payload: { currentSong } });
  }
  return (
    <div className={`${cxCpn("view-item")} ${cx("wrapper")}`}>
      <div className={cx("content")}>
        <h3>#zingchart</h3>
        <div className={cx("left")}>
          {data.items.map((item, index) => {
            if (index >= 3) {
              return;
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
                <span className={cx("rating")}>{index + 1}</span>
                <Thumbnail
                  src={item.thumbnail}
                  dataSong={item}
                  active={globalState.currentSong.encodeId == item.encodeId}
                  size={60}
                ></Thumbnail>
                <div className={cx("info")}>
                  <h5>{item.title}</h5>
                  <h6>{item.artistsNames}</h6>
                </div>
              </div>
            );
          })}
        </div>
        <div className={cx("right")}></div>
      </div>
    </div>
  );
}
export default RTchar;
