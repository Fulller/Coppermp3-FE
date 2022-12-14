import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Signin.module.scss";
import classNames from "classnames/bind";
import domainbe from "../../tools/domainbe";
import services from "../../services";

let cx = classNames.bind(style);
function Signin() {
  let ungRef = useRef();
  let fngRef = useRef();
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
  let [fng, setFng] = useState({});
  let [pwg, setPwg] = useState({});
  useEffect(() => {
    setUng(new InputGroup(ungRef, setUng));
    setFng(new InputGroup(fngRef, setFng));
    setPwg(new InputGroup(pwgRef, setPwg));
  }, []);
  let listG = [ung, fng, pwg];
  async function submitForm() {
    listG.forEach((group) => {
      group.checkInput();
    });
    if (
      listG.every((group) => {
        return group.isEntered;
      })
    ) {
      let dataSignin = await services.signin({
        userName: ung.inputDom.value,
        fullName: fng.inputDom.value,
        password: pwg.inputDom.value,
      });
      if (dataSignin.isSuccessful) {
        setTimeout(() => (window.location.href = "/login"), 300);
      } else {
        messageRef.current.style.opacity = 1;
        messageRef.current.innerText = dataSignin.message;
      }
    }
  }
  return (
    <div className={cx("wrapper")}>
      <div className={cx("form")}>
        <h1>Sign in</h1>
        <div ref={ungRef} className={cx("input-group")}>
          <input spellCheck="false" placeholder="User name"></input>
          <label aria-disabled>User name</label>
          <p>Please enter username</p>
        </div>
        <div ref={fngRef} className={cx("input-group")}>
          <input spellCheck="false" placeholder="Full name"></input>
          <label>Full name</label>
          <p>Please enter fullname</p>
        </div>
        <div ref={pwgRef} className={cx("input-group")}>
          <input spellCheck="false" placeholder="Password"></input>
          <label>Password</label>
          <p>Please enter password</p>
        </div>
        <h2 ref={messageRef}>Error</h2>
        <button onClick={submitForm}>Sigin</button>
        <footer>
          <Link to={"/login"}>Log in</Link>
        </footer>
      </div>
      <img
        className={cx("logorotate")}
        src={domainbe.image("/defaultAvatar.jpg")}
      ></img>
    </div>
  );
}
export default Signin;
