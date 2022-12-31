import style from "./SearchBox.module.scss";
import classNames from "classnames/bind";
import { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../../../Component/GlobalState";

let cx = classNames.bind(style);
function SearchBox() {
  let [input, setInput] = useState("");
  let [globalState, dispatch] = useContext(GlobalContext);
  let searchBtnRef = useRef();
  let inputRef = useRef();
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
        <Link
          to="/search"
          ref={searchBtnRef}
          onClick={(e) => {
            e.target.blur();
            dispatch({ type: "search", payload: { search: input } });
          }}
        >
          <span className="material-symbols-outlined">search</span>
        </Link>
        <input
          placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
          spellCheck="false"
          value={input}
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              inputRef.current.blur();
              searchBtnRef.current.click();
              setInput("");
            }
          }}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        ></input>
      </div>
    </div>
  );
}
export default SearchBox;
