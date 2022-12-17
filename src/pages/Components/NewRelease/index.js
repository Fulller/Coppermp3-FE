import style from "./NewRelease.module.scss";
import cpnStyle from "../Components.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(style);
let cxCpn = classNames.bind(cpnStyle);
function NewRelease({ data }) {
  console.log(data);
  return (
    <div className={`${cxCpn("view-item")} ${cx("wrapper")}`}>
      <h3>{data.title.toUpperCase()}</h3>
      <div>
        <button>TẤT CẢ</button>
        <button>VIỆT NAM</button>
        <button>QUỐC TẾ</button>
      </div>
    </div>
  );
}
export default NewRelease;
