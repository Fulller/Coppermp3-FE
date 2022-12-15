import { createContext, useReducer, useRef, useEffect } from "react";
import LocalStorage from "../../tools/localStorage";
import urlMedia from "../../tools/urlMedia";

let GlobalContext = createContext();
function GlobalState({ children }) {
  let globalInitState = LocalStorage.get("coppermp3", {
    isLogin: false,
    user: {},
    pageId: "home",
    currentSong: {
      encodeId: "ZWDAAU8Z",
      title: "Hoa Hải Đường",
      alias: "Hoa-Hai-Duong-Jack-J97",
      isOffical: true,
      username: "",
      artistsNames: "Jack – J97",
      artists: [
        {
          id: "IW6WCI7U",
          name: "Jack - J97",
          link: "/Jack-J97",
          spotlight: false,
          alias: "Jack-J97",
          thumbnail:
            "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/5/e/5/d/5e5dfdfa44a483ebaf6952fa52a5a60a.jpg",
          thumbnailM:
            "https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/5/e/5/d/5e5dfdfa44a483ebaf6952fa52a5a60a.jpg",
          isOA: true,
          isOABrand: false,
          playlistId: "ZUDICAF0",
        },
      ],
      isWorldWide: true,
      thumbnailM:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/a/8/6/2/a8626a5671f5a01250a074c4c8140cae.jpg",
      link: "/bai-hat/Hoa-Hai-Duong-Jack-J97/ZWDAAU8Z.html",
      thumbnail:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/a/8/6/2/a8626a5671f5a01250a074c4c8140cae.jpg",
      duration: 230,
      zingChoice: false,
      isPrivate: false,
      preRelease: false,
      releaseDate: 1600776000,
      genreIds: ["IWZ9Z08I", "IWZ9Z088", "IWZ97FCD"],
      album: {
        encodeId: "6UB6BF9W",
        title: "Hoa Hải Đường (Single)",
        thumbnail:
          "https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/a/8/6/2/a8626a5671f5a01250a074c4c8140cae.jpg",
        isoffical: true,
        link: "/album/Hoa-Hai-Duong-Single-Jack/6UB6BF9W.html",
        isIndie: false,
        releaseDate: "22/09/2020",
        sortDescription: "",
        genreIds: ["IWZ9Z08I", "IWZ9Z088", "IWZ97FCD"],
        PR: false,
        artists: [
          {
            id: "IW6WCI7U",
            name: "Jack - J97",
            link: "/Jack-J97",
            spotlight: false,
            alias: "Jack-J97",
            thumbnail:
              "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/5/e/5/d/5e5dfdfa44a483ebaf6952fa52a5a60a.jpg",
            thumbnailM:
              "https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/5/e/5/d/5e5dfdfa44a483ebaf6952fa52a5a60a.jpg",
            isOA: true,
            isOABrand: false,
            playlistId: "ZUDICAF0",
            totalFollow: 2493979,
          },
        ],
        artistsNames: "Jack",
      },
      indicators: [],
      radioId: 1382486158,
      isIndie: false,
      streamingStatus: 1,
      allowAudioAds: true,
      hasLyric: true,
    },
    volume: 100,
  });
  function globalReducer(state, action) {
    let newState = {};
    switch (action.type) {
      case "login": {
        newState = { ...state, isLogin: true, user: action.payload.user };
        break;
      }
      case "changePageActiveId": {
        newState = { ...state, pageId: action.payload.pageId };
        break;
      }
      case "volume": {
        newState = { ...state, volume: action.payload.volume };
        break;
      }
    }
    LocalStorage.set("coppermp3", newState);
    return { ...newState };
  }
  let [globalState, dispatch] = useReducer(globalReducer, globalInitState);
  return (
    <>
      <GlobalContext.Provider value={[globalState, dispatch]}>
        {children}
        <audio
          id="audio"
          src={urlMedia.audio(globalState.currentSong.encodeId, 320)}
        ></audio>
      </GlobalContext.Provider>
    </>
  );
}
export { GlobalContext };
export default GlobalState;
