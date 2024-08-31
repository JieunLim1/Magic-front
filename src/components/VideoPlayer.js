import { useState, useParams } from "react";
import "videojs-youtube";
import "./video-js.min.css";
import captions from "../captions/cider.vtt";

const VideoPage = () => {
  const videoID = "VBoZSbRcfJ4";
  console.log(`this is video id: ${videoID}`);

  return (
    <>
      <main class="container">
        <h1 id="title" style={{ marginTop: "2rem" }}>
        </h1>
        <video
          id="vid1"
          class="video-js vjs-default-skin vjs-big-play-centered"
          controls
          data-setup={`{ "fluid": true, "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "https://www.youtube.com/watch?v=${videoID}"}] }`}
        >
          <track
            kind="captions"
            src={captions}
            srclang="en"
            label="English"
            mode="showing"
          ></track>
        </video>
      </main>

      <script src={"%PUBLIC_URL%/dist/video.min.js"}></script>
      <script src={"%PUBLIC_URL%/dist/Youtube.min.js"}></script>
    </>
  );
};

export default VideoPage;