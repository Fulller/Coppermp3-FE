// function get(key, defaultValue) {
//   let result = JSON.parse(localStorage.getItem(key));
//   switch (typeof defaultValue) {
//     case "object": {
//       if (
//         result &&
//         Object.keys(result).length == Object.keys(defaultValue).length &&
//         Object.keys(result).every((keyItem) => {
//           return Object.keys(defaultValue).includes(keyItem);
//         })
//       ) {
//         return result;
//       } else {
//         localStorage.setItem(key, JSON.stringify(defaultValue));
//         return defaultValue;
//       }
//     }
//     default: {
//       if (result != null) {
//         return result;
//       } else {
//         localStorage.setItem(key, JSON.stringify(defaultValue));
//         return defaultValue;
//       }
//     }
//   }
// }
function get(key, defaultValue) {
  let result = JSON.parse(localStorage.getItem(key));
  if (result != null) {
    return result;
  } else {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
}
function set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export default { get, set };
