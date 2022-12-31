import style from "./Popper.module.scss";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";

let cx = classNames.bind(style);
function Popper({ children, content }) {
  return (
    <Tippy
      content={<div className={cx("lyricPopper")}>{content}</div>}
      delay={0}
      duration={0}
    >
      {children}
    </Tippy>
  );
}
export default Popper;
