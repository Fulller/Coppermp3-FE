import classNames from "classnames/bind";
import cpnStyle from "../Components.module.scss";

let cxCpn = classNames.bind(cpnStyle);
function AllBtn({ hanleClick }) {
  return (
    <div className={cxCpn("allbtn")} onClick={hanleClick}>
      <p>TẤT CẢ</p>
      <span class="material-symbols-outlined">chevron_right</span>
    </div>
  );
}
export default AllBtn;
