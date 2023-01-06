import cpnStyle from "../../Components/Components.module.scss";
import style from "./Loading.module.scss";
import classNames from "classnames/bind";

let cxCpn = classNames.bind(cpnStyle);
let cx = classNames.bind(style);
function Loading() {
  return (
    <div className={cxCpn(["wrapper", "loading"]) + " " + cx("wrapper")}>
      <div className={cx("animatePlay")}>
        <span className={cx("cl1")}></span>
        <span className={cx("cl2")}></span>
        <span className={cx("cl3")}></span>
        <span className={cx("cl4")}></span>
        <span className={cx("cl5")}></span>
        <span className={cx("cl1")}></span>
        <span className={cx("cl2")}></span>
        <span className={cx("cl3")}></span>
        <span className={cx("cl4")}></span>
        <span className={cx("cl5")}></span>
        <span className={cx("cl1")}></span>
        <span className={cx("cl2")}></span>
        <span className={cx("cl3")}></span>
        <span className={cx("cl4")}></span>
        <span className={cx("cl5")}></span>
        <span className={cx("cl1")}></span>
        <span className={cx("cl2")}></span>
        <span className={cx("cl3")}></span>
        <span className={cx("cl4")}></span>
        <span className={cx("cl5")}></span>
      </div>
    </div>
  );
}
export default Loading;
