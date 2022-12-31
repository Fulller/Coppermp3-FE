import style from "./MVicon.module.scss";
import classNames from "classnames/bind";
import { GlobalContext } from "../GlobalState";
import { useContext } from "react";
import Popper from "../Popper";

let cx = classNames.bind(style);
function MVicon({ data, type = "hide" }) {
  let [globalState, dispatch] = useContext(GlobalContext);
  return (
    <Popper content={"Xem MV"}>
      <div className={cx(["wrapper", !data.mvlink && type])}>
        <button
          onClick={() => {
            if (data.mvlink) {
              dispatch({
                type: "mvEncodeId",
                payload: { mvEncodeId: data.encodeId },
              });
              dispatch({ type: "MVview", payload: { MVview: true } });
            }
          }}
        >
          MV
        </button>
      </div>
    </Popper>
  );
}
export default MVicon;
