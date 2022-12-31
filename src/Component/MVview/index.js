import style from "./MVview.module.scss";
import classNames from "classnames/bind";
import { GlobalContext } from "../GlobalState";
import { useContext, useEffect, useState } from "react";
import services from "../../services";

let cx = classNames.bind(style);
function MVview() {
  let [globalState, dispatch] = useContext(GlobalContext);
  let [dataMV, setDataMV] = useState(null);
  useEffect(() => {
    async function getDataMV() {
      setDataMV(await services.getVideo({ encodeId: globalState.mvEncodeId }));
    }
    getDataMV();
  }, [globalState.mvEncodeId]);
  return (
    <>
      {globalState.MVview && dataMV && (
        <div className={cx("wrapper")}>
          <button
            onClick={() => {
              dispatch({ type: "MVview", payload: { MVview: false } });
            }}
          >
            hide
          </button>
          <h1>{dataMV.title}</h1>
        </div>
      )}
    </>
  );
}
export default MVview;
