import classNames from "classnames/bind";
import cpnStyle from "../Components.module.scss";
import { Link } from "react-router-dom";

let cxCpn = classNames.bind(cpnStyle);
function AllBtn({ to = "", hanleClick }) {
  return (
    <Link to={to} className={cxCpn("allbtn")} onClick={hanleClick}>
      <p>TẤT CẢ</p>
      <span className="material-symbols-outlined">chevron_right</span>
    </Link>
  );
}
export default AllBtn;
