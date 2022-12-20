import style from "./NewReleaseChart.module.scss";
import cpnStyle from "../Components.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(style);
let cxCpn = classNames.bind(cpnStyle);
function NewReleaseChart({ data }) {
  return (
    <div className={`${cxCpn("view-item")} ${cx("wrapper")}`}>
      <h3>{data.title}</h3>
      <div className={cx("content")}>
        {data.items.map((item, index) => {
          if (index >= 3) {
            return;
          }
          console.log(item);
          return (
            <div className={cx("item")} key={index}>
              <img src={item.thumbnailM}></img>
              <div className={cx("info")}>
                <h5>{item.title}</h5>
                <h6>{item.artistsNames}</h6>
                <span>#{index + 1}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default NewReleaseChart;
