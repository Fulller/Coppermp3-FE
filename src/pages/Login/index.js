import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import style from "./Login.module.scss";
import classNames from "classnames/bind";
import domainbe from "../../tools/domainbe";
import services from "../../services";
import { GlobalContext } from "../../Component/GlobalState";
import LocalStorage from "../../tools/localStorage";

let cx = classNames.bind(style);
function Login() {
  let [globalState, dispatch] = useContext(GlobalContext);
  let ungRef = useRef();
  let pwgRef = useRef();
  let messageRef = useRef();
  class InputGroup {
    constructor(Ref, setInput) {
      this.group = Ref.current;
      this.inputDom = Ref.current.children[0];
      this.messageDom = Ref.current.children[2];
      this.isEntered = false;
      this.setInput = setInput;
      this.handleEvent();
    }
    checkInput() {
      if (!this.inputDom.value.trim()) {
        this.messageDom.style.opacity = 1;
        this.isEntered = false;
      } else {
        this.isEntered = true;
        this.messageDom.style.opacity = 0;
      }
    }
    handleEvent() {
      this.inputDom.onblur = this.checkInput.bind(this);
      this.inputDom.oninput = this.checkInput.bind(this);
    }
  }
  let [ung, setUng] = useState({});
  let [pwg, setPwg] = useState({});
  useEffect(() => {
    setUng(new InputGroup(ungRef, setUng));
    setPwg(new InputGroup(pwgRef, setPwg));
  }, []);
  useEffect(() => {
    if (LocalStorage.get("isLogincmp3", false)) {
      window.location.href = "/discovery";
    }
  }, [globalState.isLogin]);
  let listG = [ung, pwg];
  async function submitForm() {
    listG.forEach((group) => {
      group.checkInput();
    });
    if (
      listG.every((group) => {
        return group.isEntered;
      })
    ) {
      let dataLogin = await services.login({
        userName: ung.inputDom.value,
        password: pwg.inputDom.value,
      });
      if (dataLogin.isSuccessful) {
        dispatch({ type: "login", payload: { user: dataLogin.user } });
        LocalStorage.set("isLogincmp3", true);
        window.location.href = "/discovery";
      } else {
        messageRef.current.innerText = dataLogin.message;
        messageRef.current.style.opacity = 1;
      }
    }
  }
  return (
    <div className={cx("wrapper")}>
      <div className={cx("form")}>
        <h1>Log in</h1>
        <div ref={ungRef} className={cx("input-group")}>
          <input spellCheck="false" placeholder="User name"></input>
          <label aria-disabled>User name</label>
          <p>Please enter username</p>
        </div>
        <div ref={pwgRef} className={cx("input-group")}>
          <input spellCheck="false" placeholder="Password"></input>
          <label>Password</label>
          <p>Please enter password</p>
        </div>
        <h2 ref={messageRef}>Error</h2>
        <button onClick={submitForm}>Log in</button>
        <footer>
          <Link to="/signin">Sign in</Link>
        </footer>
      </div>
      <img
        className={cx("logorotate")}
        src={domainbe.image("/defaultAvatar.jpg")}
      ></img>
    </div>
  );
}
export default Login;
