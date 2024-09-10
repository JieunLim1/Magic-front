import React, { useEffect, useRef, useState } from "react";
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import "videojs-youtube";
import captions from "../captions/cider.vtt";

const VideoPage = ({videoID, captionsSrc}) => {
  //const videoID = "VBoZSbRcfJ4";
  console.log(`this is video id: ${videoID}`);
  console.log(`this is caption src: ${captionsSrc}`)

  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    console.log("videoRef.current initial:", videoRef.current);

    if (videoRef.current && !playerRef.current) {
      console.log("Initializing Video.js with video element");

      playerRef.current = videojs(videoRef.current, {
        techOrder: ["youtube"],
        sources: [
          {
            type: "video/youtube",
            src: `https://www.youtube.com/watch?v=${videoID}`,
          },
        ],
      });

      console.log("Video.js player initialized");
    }
  }, [videoID]);

  useEffect(() => {
    const player = playerRef.current;

    if (player && captionsSrc) {
      console.log("playerRef.current:", playerRef.current);
      console.log("captionsSrc", captionsSrc);

      // 이전 자막 트랙 제거
      const tracks = player.textTracks();
      while (tracks.length > 0) {
        player.removeRemoteTextTrack(tracks[0]);
      }

      // 새로운 자막 트랙 추가
      if (captionsSrc) {
        const track = player.addRemoteTextTrack({
          kind: "captions",
          src: captionsSrc,
          srclang: "ko",
          label: "Korean",
          default: true, // 기본 자막 트랙으로 설정
        }, false);

        // 자막 트랙을 자동으로 활성화
        track.track.mode = "showing";
      }
    }
  }, [captionsSrc]);

  const handleLogTracks = () => {
    if (playerRef.current) {
      const tracks = playerRef.current.textTracks();
      if (tracks && tracks.length > 0) {
        for (let i = 0; i < tracks.length; i++) {
          console.log(`Track ${i}:`, tracks[i]);
        }
      } else {
        console.log("No text tracks found.");
      }
    } else {
      console.log("Player not initialized.");
    }
  };

  return (
    <>
      <main class="container">
        <h1 id="title" style={{ marginTop: "2rem" }}>
        </h1>
        <video ref={videoRef} className="video-js vjs-default-skin vjs-big-play-centered" controls></video>
        <button onClick={handleLogTracks} style={{ marginTop: "1rem" }}>Log Caption Tracks</button>
      </main>

    </>
  );
};

export default VideoPage;