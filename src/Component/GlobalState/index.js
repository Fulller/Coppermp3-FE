import { createContext, useReducer, useRef, useEffect } from "react";
import LocalStorage from "../../tools/localStorage";
import urlMedia from "../../tools/urlMedia";
import MVview from "../MVview";

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
    currentPlaylist: [
      {
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
    ],
    prevSong: null,
    nextSong: null,
    isPlay: false,
    search: "",
    MVview: false,
    mvEncodeId: "",
    artistName: "ERIK",
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
        let historySong = LocalStorage.get("historySongcmp3", []);
        if (
          !historySong.some((song) => {
            return song.encodeId == action.payload.currentSong.encodeId;
          })
        ) {
          if (historySong.length >= 50) {
            historySong.pop();
          }
          historySong.unshift(action.payload.currentSong);
          LocalStorage.set("historySongcmp3", historySong);
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
      case "search":
        newState = {
          ...state,
          search: action.payload.search,
        };
        break;
      case "MVview":
        newState = {
          ...state,
          MVview: action.payload.MVview,
        };
        break;
      case "mvEncodeId":
        newState = {
          ...state,
          mvEncodeId: action.payload.mvEncodeId,
        };
        break;
      case "artistName":
        newState = {
          ...state,
          artistName: action.payload.artistName,
        };
        break;
      case "avatar":
        newState = {
          ...state,
          user: { ...state.user, avatar: action.payload.avatar },
        };
        break;
    }
    LocalStorage.set("coppermp3", newState);
    return { ...newState };
  }
  let [globalState, dispatch] = useReducer(globalReducer, globalInitState);
  // useEffect(() => {
  //   if (!LocalStorage.get("isLogincmp3", false)) {
  //     if (!window.location.href.endsWith("/login")) {
  //       window.location.href = `/login`;
  //     }
  //   } else {
  //     if (window.location.href.endsWith("/login")) {
  //       window.location.href = `/${globalState.pageId}`;
  //     }
  //   }
  //   dispatch({ type: "isPlay", payload: { isPlay: false } });
  // }, []);
  useEffect(() => {
    window.onerror = function (errorMsg, url, lineNumber) {
      console.log(errorMsg, url, lineNumber);
      return false;
    };
  }, []);

  return (
    <GlobalContext.Provider value={[globalState, dispatch]}>
      {children}
      <audio
        id="audio"
        src={urlMedia.audio(globalState.currentSong.encodeId, 320)}
      ></audio>
      <MVview></MVview>
    </GlobalContext.Provider>
  );
}
export { GlobalContext };
export default GlobalState;
