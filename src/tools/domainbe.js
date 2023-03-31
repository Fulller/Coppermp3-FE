// let domain = "https://zingmp3-fpci.onrender.com";
let domain = process.env.REACT_APP_SERVERURL;

export default {
  image: function (url) {
    return domain + "/images" + url;
  },
  api: function (url) {
    return domain + "/api/v2" + url;
  },
  origin: function (url) {
    return domain + url;
  },
};
