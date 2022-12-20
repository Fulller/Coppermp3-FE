import style from "./SearchBox.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(style);
function SearchBox() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("back-forward")}>
        <span
          className={cx(["material-symbols-outlined"])}
          onClick={() => window.history.back()}
        >
          arrow_back
        </span>
        <span
          className={cx(["material-symbols-outlined"])}
          onClick={() => window.history.forward()}
        >
          arrow_forward
        </span>
      </div>
      <div className={cx("search")}>
        <span className="material-symbols-outlined">search</span>
        <input
          placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
          spellCheck="false"
        ></input>
      </div>
    </div>
  );
}
export default SearchBox;
