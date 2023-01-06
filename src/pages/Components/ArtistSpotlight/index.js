import classNames from "classnames/bind";
import style from "./ArtistSpotlight.module.scss";
import cpnStyle from "../Components.module.scss";

let cx = classNames.bind(style);
let cxCpn = classNames.bind(cpnStyle);
function ArtistSpotlight({ data }) {
  return (
    <div className={`${cxCpn("view-item")} ${cx("wrapper")}`}>
      <div className={cx("content")}>
        {data.items.map((item, index) => {
          return (
            <div className={cx("item")} key={index}>
              <img src={item.thumbnailM}></img>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ArtistSpotlight;
