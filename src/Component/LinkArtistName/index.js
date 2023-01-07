import style from "./LinkArtistName.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { GlobalContext } from "../GlobalState";
import { useContext } from "react";
import removeVietnameseTones from "../../tools/removeVietnameseTones";

let cx = classNames.bind(style);
function LinkArtistName({ data, fontSize = 12, style = {} }) {
  let [globalState, dispatch] = useContext(GlobalContext);
  return (
    <h5 style={{ ...style, fontSize }} className={cx("wrapper")}>
      {data &&
        data.map((artist, index) => {
          let space = "";
          if (index > 0) {
            space = ", ";
          }
          return (
            <Link
              to={"/artist"}
              onClick={() => {
                dispatch({
                  type: "artistName",
                  payload: {
                    artistName: artist.alias,
                  },
                });
              }}
              className={cx("item")}
              key={index}
            >
              {space + artist.name}
            </Link>
          );
        })}
    </h5>
  );
}
export default LinkArtistName;
