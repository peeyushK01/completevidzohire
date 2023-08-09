import React, { useEffect, useState } from "react";

const Dummy = () => {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    async function fetchVideo() {
      const videoPath =
        "http://localhost:8080/video/e60c236f0bc3d7911b6f3fdcea98f75f";
      const response = await fetch(videoPath);

      if (response.status === 200 || response.status === 206) {
        const videoBlob = await response.blob();
        const videoUrl = URL.createObjectURL(videoBlob);
        setVideoUrl(videoUrl);
      } else {
        console.error("Failed to fetch video:", response.status);
      }
    }

    fetchVideo();
  }, []);

  return (
    <div className="video-container">
      {videoUrl ? (
        <video className="video-player" controls>
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default Dummy;
