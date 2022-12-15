import domainbe from "../../../../tools/domainbe";
import style from "./Account.module.scss";
import classNames from "classnames/bind";
import { GlobalContext } from "../../../../Component/GlobalState";
import { useContext } from "react";

let cx = classNames.bind(style);
function Account() {
  let [globalState, dispatch] = useContext(GlobalContext);
  return (
    <div className={cx("wrapper")}>
      <span>{globalState.user.fullName}</span>
      <img src={domainbe.image("/defaultAvatar.jpg")}></img>
    </div>
  );
}
export default Account;
