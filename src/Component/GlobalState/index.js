import { createContext, useReducer, useState } from "react";
import LocalStorage from "../../tools/localStorage";

let GlobalContext = createContext();
let globalInitState = LocalStorage.get("coppermp3", {
  isLogin: false,
  user: {},
});
function globalReducer(state, action) {
  let newSate = {};
  switch (action.type) {
    case "login": {
      newSate = { ...state, isLogin: true, user: action.payload.user };
    }
  }
  LocalStorage.set("coppermp3", newSate);
  return { ...newSate };
}
function GlobalState({ children }) {
  let [globalState, dispatch] = useReducer(globalReducer, globalInitState);
  return (
    <>
      <GlobalContext.Provider value={[globalState, dispatch]}>
        {children}
      </GlobalContext.Provider>
    </>
  );
}
export { GlobalContext };
export default GlobalState;
