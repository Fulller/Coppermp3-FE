import style from "./Login.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(style);
function ButtonSocial({ data }) {
  return (
    <a className={cx("button-social")} href={data.link}>
      <h3>{data.title}</h3>
      <img src={data.icon}></img>
    </a>
  );
}

export default ButtonSocial;
