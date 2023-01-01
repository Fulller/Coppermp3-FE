function Video({ src, cx }) {
  return (
    <div className={cx("videowrapper")}>
      <video className={cx("video")} src={src} controls autoPlay></video>
    </div>
  );
}
export default Video;
