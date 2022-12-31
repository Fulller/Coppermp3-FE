import style from "./NextPopper.module.scss";
import classNames from "classnames/bind";
import { GlobalContext } from "../../../../../../Component/GlobalState";
import { useContext } from "react";
import Tippy from "@tippyjs/react";

let cx = classNames.bind(style);
function NextPopper({ children }) {
  let [globalState, dispatch] = useContext(GlobalContext);
  return (
    <>
      {globalState.nextSong ? (
        <Tippy
          content={
            <div className={cx("container")}>
              <h4>Phát tiếp theo</h4>
              <div className={cx("content")}>
                <img src={globalState.nextSong.thumbnail}></img>
                <div className={cx("info")}>
                  <h5>{globalState.nextSong.title}</h5>
                  <h6>{globalState.nextSong.artistsNames}</h6>
                </div>
              </div>
            </div>
          }
        >
          {children}
        </Tippy>
      ) : (
        children
      )}
    </>
  );
}
export default NextPopper;
