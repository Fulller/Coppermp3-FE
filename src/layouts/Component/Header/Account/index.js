import domainbe from "../../../../tools/domainbe";
import style from "./Account.module.scss";
import classNames from "classnames/bind";
import { GlobalContext } from "../../../../Component/GlobalState";
import { useContext, useState } from "react";
import Headless from "@tippyjs/react/headless";
import LocalStorage from "../../../../tools/localStorage";
import { Link } from "react-router-dom";
import services from "../../../../services";

let cx = classNames.bind(style);
function Account() {
  let [globalState, dispatch] = useContext(GlobalContext);
  let [isShow, setIsShow] = useState(false);
  async function changeAvatar(file) {
    let avatarPath = await services.uploadimage(file);
    dispatch({ type: "avatar", payload: { avatar: avatarPath } });
    await services.updateUser({ id: globalState.user._id, avatar: avatarPath });
  }
  return (
    <Headless
      visible={isShow}
      render={(attrs) => (
        <div className={cx("popper")} tabIndex="-1" {...attrs} style={style}>
          <h3 className={cx("fullName")}>{globalState.user.fullName}</h3>
          <input
            type="file"
            id="avatarInput"
            accept="image/*"
            onChange={(e) => {
              changeAvatar(e.target.files[0]);
            }}
          ></input>
          <label for="avatarInput" className={cx("option")}>
            <span className="material-symbols-outlined">account_circle</span>
            <p>Cập nhật avatar</p>
          </label>
          <Link
            className={cx("option")}
            to="/login"
            onClick={() => {
              document.querySelector("#audio").pause();
              LocalStorage.set("isLogincmp3", false);
            }}
          >
            <span className="material-symbols-outlined">logout</span>
            <p>Đăng xuất</p>
          </Link>
        </div>
      )}
      interactive={true}
      content="Xem thêm"
      placement="right-end"
      onClickOutside={() => {
        setIsShow(false);
      }}
      hideOnClick
    >
      <div
        className={cx("wrapper")}
        onClick={() => {
          setIsShow(!isShow);
        }}
      >
        <img src={globalState.user.avatar}></img>
      </div>
    </Headless>
  );
}
export default Account;
