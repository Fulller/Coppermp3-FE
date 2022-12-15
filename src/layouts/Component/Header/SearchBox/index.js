import style from "./SearchBox.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(style);
function SearchBox() {
  return (
    <div className={cx("wrapper")}>
      <span className="material-symbols-outlined">search</span>
      <input
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
        spellCheck="false"
      ></input>
    </div>
  );
}
export default SearchBox;
