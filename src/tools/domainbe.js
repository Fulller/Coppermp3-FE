let domain = "http://localhost:3001";
export default {
  image: function (url) {
    return domain + "/images" + url;
  },
  api: function (url) {
    return domain + "/api" + url;
  },
};
