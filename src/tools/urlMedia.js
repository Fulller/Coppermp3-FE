function audio(id, quality = 320) {
  return `http://api.mp3.zing.vn/api/streaming/audio/${id}/${quality}`;
}
function video(id, quality = 720) {
  return `http://api.mp3.zing.vn/api/streaming/video/${id}/${quality}`;
}

export default { audio, video };
