import { createContext, useReducer, useRef, useEffect } from "react";
import LocalStorage from "../../tools/localStorage";
import urlMedia from "../../tools/urlMedia";
import domainfe from "../../tools/domainfe";

let GlobalContext = createContext();
function GlobalState({ children }) {
  let globalInitState = LocalStorage.get("coppermp3", {
    user: {},
    pageId: "discovery",
    currentSong: {
      encodeId: "IWB6IFZ7",
      title: "See You Again ft. Charlie Puth [320]",
      alias: "See-You-Again-ft-Charlie-Puth-320-charlie-puth",
      isOffical: false,
      username: "sauthuffc",
      artistsNames: "charlie puth",
      isWorldWide: false,
      thumbnailM:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg",
      link: "/bai-hat/See-You-Again-ft-Charlie-Puth-320-charlie-puth/IWB6IFZ7.html",
      thumbnail:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg",
      duration: 237,
      zingChoice: false,
      isPrivate: false,
      preRelease: false,
      releaseDate: 0,
      genreIds: ["IWZ9Z097", "IWZ9Z08O"],
      indicators: [],
      isIndie: false,
      privacyIcon: "global",
      streamingStatus: 1,
      allowAudioAds: false,
    },
    playlistEncodeId: "",
    currentPlaylist: {},
    prevSong: null,
    nextSong: null,
    isPlay: false,
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
        let prevSongPl = null;
        let nextSongPl = null;
        for (let i = 0; i < state.currentPlaylist.length; i++) {
          if (state.currentPlaylist.length > 0) {
            if (state.currentPlaylist[i]) {
              if (
                state.currentPlaylist[i].encodeId ==
                action.payload.currentSong.encodeId
              ) {
                if (state.currentPlaylist[i - 1]) {
                  prevSongPl = state.currentPlaylist[i - 1];
                }
                if (state.currentPlaylist[i + 1]) {
                  nextSongPl = state.currentPlaylist[i + 1];
                }
              }
            }
          }
        }
        newState = {
          ...state,
          currentSong: action.payload.currentSong,
          prevSong: prevSongPl,
          nextSong: nextSongPl,
        };
        break;
      }
      case "playlistEncodeId": {
        newState = {
          ...state,
          playlistEncodeId: action.payload.playlistEncodeId,
        };
        break;
      }
      case "currentPlaylist": {
        newState = {
          ...state,
          currentPlaylist: action.payload.currentPlaylist,
        };
        break;
      }
      case "isPlay":
        newState = {
          ...state,
          isPlay: action.payload.isPlay,
        };
        break;
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
    dispatch({ type: "isPlay", payload: { isPlay: false } });
  }, []);

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
