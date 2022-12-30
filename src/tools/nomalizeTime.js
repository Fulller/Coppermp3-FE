function nomalizeTime(time) {
  let minus = Math.floor(time / 60).toString();
  let second = Math.floor(time % 60).toString();
  return `${minus.length == 1 ? 0 + minus : minus}:${
    second.length == 1 ? 0 + second : second
  }`;
}
export default nomalizeTime;
