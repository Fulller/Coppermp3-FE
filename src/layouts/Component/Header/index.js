import style from "./Header.module.scss";
import classNames from "classnames/bind";
import SearchBox from "./SearchBox";
import Account from "./Account";

let cx = classNames.bind(style);
function Header() {
  return (
    <div className={cx("wrapper")}>
      <SearchBox></SearchBox>
      <Account></Account>
    </div>
  );
}
export default Header;
