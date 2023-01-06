import { Link } from "react-router-dom";
import { GlobalContext } from "../GlobalState";
import { useContext } from "react";
import style from "./LinkAlbum.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(style);
function LinkAlbum({ data, fontSize = 12 }) {
  let [globalState, dispatch] = useContext(GlobalContext);
  return (
    <>
      {data && (
        <Link
          to={"/playlist"}
          onClick={() => {
            dispatch({
              type: "playlistEncodeId",
              payload: { playlistEncodeId: data.encodeId },
            });
          }}
          className={cx("wrapper")}
        >
          <p style={{ fontSize }}>{data.title}</p>
        </Link>
      )}
    </>
  );
}
export default LinkAlbum;
