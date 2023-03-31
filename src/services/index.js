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
function getSong(body) {
  let url = domainbe.api("/getSong");
  return axios({
    method: "get",
    url: url,
    data: {
      encodeId: body.encodeId,
    },
  }).then((data) => data.data);
}
function getDetailPlaylist(body) {
  let url = domainbe.api("/getDetailPlaylist");
  return axios({
    method: "get",
    url: url,
    data: {
      encodeId: body.encodeId,
    },
  }).then((data) => data.data);
}
function getHome(body) {
  let url = domainbe.api("/getHome");
  return axios({
    method: "get",
    url: url,
    data: {},
  }).then((data) => data.data);
}
function getTop100(body) {
  let url = domainbe.api("/getTop100");
  return axios({
    method: "get",
    url: url,
    data: {},
  }).then((data) => data.data);
}
function getChartHome(body) {
  let url = domainbe.api("/getChartHome");
  return axios({
    method: "get",
    url: url,
    data: {},
  }).then((data) => data.data);
}
function getNewReleaseChart(body) {
  let url = domainbe.api("/getNewReleaseChart");
  return axios({
    method: "get",
    url: url,
    data: {},
  }).then((data) => data.data);
}
function getInfoSong(body) {
  let url = domainbe.api("/getInfoSong");
  return axios({
    method: "get",
    url: url,
    data: {
      encodeId: body.encodeId,
    },
  }).then((data) => data.data);
}
function getArtist(body) {
  let url = domainbe.api("/getArtist");
  return axios({
    method: "get",
    url: url,
    data: {
      name: body.name,
    },
  }).then((data) => data.data);
}
function getListArtistSong(body) {
  let url = domainbe.api("/getListArtistSong");
  return axios({
    method: "get",
    url: url,
    data: {
      encodeId: body.encodeId,
      page: body.page,
      count: body.count,
    },
  }).then((data) => data.data);
}
function getLyric(body) {
  let url = domainbe.api("/getLyric");
  return axios({
    method: "get",
    url: url,
    data: {
      encodeId: body.encodeId,
    },
  }).then((data) => data.data);
}
function search(body) {
  let url = domainbe.api("/search");
  return axios({
    method: "get",
    url: url,
    data: {
      query: body.query,
    },
  }).then((data) => data.data);
}
function getListMV(body) {
  let url = domainbe.api("/getListMV");
  return axios({
    method: "get",
    url: url,
    data: {
      encodeId: body.encodeId,
      page: body.page,
      count: body.count,
    },
  }).then((data) => data.data);
}
function getCategoryMV(body) {
  let url = domainbe.api("/getCategoryMV");
  return axios({
    method: "get",
    url: url,
    data: {
      encodeId: body.encodeId,
    },
  }).then((data) => data.data);
}
function getVideo(body) {
  let url = domainbe.api("/getVideo");
  return axios({
    method: "get",
    url: url,
    data: {
      encodeId: body.encodeId,
    },
  }).then((data) => data.data);
}
function uploadimage(file) {
  let url = domainbe.api("/uploadImage");
  let bodyFormData = new FormData();
  bodyFormData.append("image", file);
  return axios({
    method: "post",
    url: url,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: bodyFormData,
  }).then((data) => data.data);
}
function updateUser(body) {
  let url = domainbe.api("/updateUser");
  return axios({
    method: "post",
    url: url,
    data: {
      id: body.id,
      avatar: body.avatar,
    },
  }).then((data) => data.data);
}
export default {
  signin,
  login,
  getSong,
  getDetailPlaylist,
  getHome,
  getTop100,
  getChartHome,
  getNewReleaseChart,
  getInfoSong,
  getArtist,
  getListArtistSong,
  getLyric,
  search,
  getListMV,
  getCategoryMV,
  getVideo,
  uploadimage,
  updateUser,
};
