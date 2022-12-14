import axios from "axios";
import domainbe from "../tools/domainbe";
function signin(body) {
  let url = domainbe.api("/register");
  return axios({
    method: "post",
    url: url,
    data: {
      userName: body.userName,
      fullName: body.fullName,
      password: body.password,
    },
  }).then((data) => data.data);
}
function login(body) {
  let url = domainbe.api("/login");
  return axios({
    method: "post",
    url: url,
    data: {
      userName: body.userName,
      password: body.password,
    },
  }).then((data) => data.data);
}
function test(body) {
  let url = domainbe.api("/test");
  return axios({
    method: "post",
    url: url,
    data: {},
  }).then((data) => data.data);
}
export default { signin, login, test };
