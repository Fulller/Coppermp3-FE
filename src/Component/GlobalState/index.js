import { createContext, useReducer, useRef, useEffect } from "react";
import LocalStorage from "../../tools/localStorage";
import urlMedia from "../../tools/urlMedia";
import domainfe from "../../tools/domainfe";

let GlobalContext = createContext();
function GlobalState({ children }) {
  let globalInitState = LocalStorage.get("coppermp3", {
    user: {},
    pageId: "home",
    currentSong: {
      encodeId: "ZWBWWU6U",
      title: "Em Có Biết",
      alias: "Em-Co-Biet-H2K",
      isOffical: true,
      username: "",
      artistsNames: "H2K",
      artists: [
        {
          id: "IW6ZZ0OU",
          name: "H2K",
          link: "/nghe-si/H2K",
          spotlight: false,
          alias: "H2K",
          thumbnail:
            "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/5/f/0/9/5f0920f4417c4625cb4dd1d0440ac286.jpg",
          thumbnailM:
            "https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/5/f/0/9/5f0920f4417c4625cb4dd1d0440ac286.jpg",
          isOA: false,
          isOABrand: false,
          playlistId: "6UW9BEA9",
        },
      ],
      isWorldWide: true,
      thumbnailM:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/5/6/f/1/56f1e4f73ad8312394ab419844f6f0bb.jpg",
      link: "/bai-hat/Em-Co-Biet-H2K/ZWBWWU6U.html",
      thumbnail:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/5/6/f/1/56f1e4f73ad8312394ab419844f6f0bb.jpg",
      duration: 213,
      zingChoice: false,
      isPrivate: false,
      preRelease: false,
      releaseDate: 1584962700,
      genreIds: ["IWZ9Z08I", "IWZ9Z088", "IWZ9Z089"],
      indicators: [],
      radioId: 1302847747,
      isIndie: false,
      streamingStatus: 1,
      allowAudioAds: true,
      hasLyric: true,
      objectType: "song",
    },
  });
  function globalReducer(state, action) {
    let newState = {};
    switch (action.type) {
      case "login": {
        newState = { ...state, user: action.payload.user };
        break;
      }
      case "changePageActiveId": {
        newState = { ...state, pageId: action.payload.pageId };
        break;
      }
      case "currentSong": {
        newState = { ...state, currentSong: action.payload.currentSong };
        break;
      }
    }
    LocalStorage.set("coppermp3", newState);
    return { ...newState };
  }
  let [globalState, dispatch] = useReducer(globalReducer, globalInitState);
  useEffect(() => {
    if (!LocalStorage.get("isLogincmp3", false)) {
      if (window.location.href != domainfe.page("/login")) {
        window.location.href = `/login`;
      }
    } else {
      if (window.location.href == domainfe.page("/login")) {
        window.location.href = `/${globalState.pageId}`;
      }
    }
  }, [1]);
  return (
    <GlobalContext.Provider value={[globalState, dispatch]}>
      {children}
      <audio
        id="audio"
        src={urlMedia.audio(globalState.currentSong.encodeId, 320)}
      ></audio>
    </GlobalContext.Provider>
  );
}
export { GlobalContext };
export default GlobalState;
