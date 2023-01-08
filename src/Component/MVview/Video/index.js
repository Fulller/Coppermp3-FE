function Video({ src, cx }) {
  return (
    <div className={cx("videowrapper")}>
      <video
        className={cx("video")}
        src={src}
        controls
        autoPlay
        onLoadStart={(e) => {
          e.target.volume = 0.5;
        }}
      ></video>
    </div>
  );
}
export default Video;
