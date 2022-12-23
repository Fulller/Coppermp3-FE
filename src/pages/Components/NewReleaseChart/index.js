import style from "./NewReleaseChart.module.scss";
import cpnStyle from "../Components.module.scss";
import classNames from "classnames/bind";
import { GlobalContext } from "../../../Component/GlobalState";
import { useContext } from "react";
import services from "../../../services";

let cx = classNames.bind(style);
let cxCpn = classNames.bind(cpnStyle);
function NewReleaseChart({ data }) {
  let [globalState, dispatch] = useContext(GlobalContext);
  async function handleChangeCurrentSong(encodeId) {
    let currentSong = await services.getInfoSong({ encodeId });
    dispatch({
      type: "currentPlaylist",
      payload: { currentPlaylist: data.items },
    });
    dispatch({ type: "currentSong", payload: { currentSong } });
  }
  return (
    <div className={`${cxCpn("view-item")} ${cx("wrapper")}`}>
      <h3>{data.title}</h3>
      <div className={cx("content")}>
        {data.items.map((item, index) => {
          if (index >= 3) {
            return;
          }
          return (
            <div className={cx("item")} key={index}>
              <div
                className={cx("thumbnail")}
                onClick={() => handleChangeCurrentSong(item.encodeId)}
              >
                <img src={item.thumbnailM}></img>
                <span className="material-symbols-outlined">play_arrow</span>
              </div>
              <div className={cx("info")}>
                <h5>{item.title}</h5>
                <h6>{item.artistsNames}</h6>
                <p>#{index + 1}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default NewReleaseChart;
