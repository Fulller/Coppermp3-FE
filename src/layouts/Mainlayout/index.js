import Header from "../Component/Header";
import Player from "../Component/Player";
import Sidebar from "../Component/Sidebar";
import style from "./Mainlayout.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(style);
function Mainlayout({ children }) {
  return (
    <div className={cx("layout")}>
      <div className={cx("upper-part")}>
        <Sidebar></Sidebar>
        <div className={cx("right-part")}>
          <Header></Header>
          <div className={cx("main-page")}>{children}</div>
        </div>
      </div>
      <Player></Player>
    </div>
  );
}
export default Mainlayout;
