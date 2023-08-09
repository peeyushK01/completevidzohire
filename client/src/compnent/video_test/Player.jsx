import React, { useEffect, useState } from "react";

const VideoPlayer = ({ videoUrl }) => {
  const [videoBlob, setVideoBlob] = useState(null);

  useEffect(() => {
    async function fetchVideo() {
      try {
        const response = await fetch(videoUrl);
        if (response.ok) {
          const videoBlob = await response.blob();
          setVideoBlob(videoBlob);
        } else {
          console.error("Failed to fetch video:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch video:", error);
      }
    }

    fetchVideo();
  }, [videoUrl]);

  return (
    <div>
      {videoBlob ? (
        <video className="video-player" controls>
          <source src={URL.createObjectURL(videoBlob)} type="video/mp4" />
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

const Newvideo = () => {
  const [videoUrls, setVideoUrls] = useState([]);

  useEffect(() => {
    async function fetchVideoUrls() {
      try {
        const response = await fetch("http://localhost:8080/videos"); // Replace with your backend endpoint to fetch video URLs
        if (response.ok) {
          const videoPaths = await response.json();
          const urls = videoPaths.map(
            (path) => `http://localhost:8080/${path}` // Modify the URL to include the "uploads" directory
          );
          setVideoUrls(urls);
        } else {
          console.error("Failed to fetch video paths:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch video paths:", error);
      }
    }

    fetchVideoUrls();
  }, []);

  return (
    <div>
      {videoUrls.length > 0 ? (
        videoUrls.map((videoUrl, index) => (
          <VideoPlayer key={index} videoUrl={videoUrl} />
        ))
      ) : (
        <p>Loading videos...</p>
      )}
    </div>
  );
};

export default Newvideo;
