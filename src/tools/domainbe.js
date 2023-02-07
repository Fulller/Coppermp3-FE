let domain = "https://zingmp3-fpci.onrender.com";
export default {
  image: function (url) {
    return domain + "/images" + url;
  },
  api: function (url) {
    return domain + "/api" + url;
  },
  origin: function (url) {
    return domain + url;
  },
};
