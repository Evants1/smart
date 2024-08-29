import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GIF from 'gif.js';

const VideoToGIFComponent = () => {
  const [video, setVideo] = useState(null);
  const [gif, setGif] = useState(null);
  const canvasRef = useRef(null);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setVideo(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid video file.');
    }
  };

  const convertToGIF = () => {
    const videoElement = document.createElement('video');
    videoElement.src = video;
    videoElement.muted = true;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    videoElement.addEventListener('loadeddata', () => {
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;

      const gifFrames = [];

      videoElement.play();
      videoElement.addEventListener('timeupdate', () => {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        gifFrames.push(ctx.getImageData(0, 0, canvas.width, canvas.height));

        if (videoElement.currentTime >= videoElement.duration) {
          videoElement.pause();
          generateGIF(gifFrames);
        }
      });
    });
  };

  const generateGIF = (frames) => {
    const gif = new GIF({
      workers: 2,
      quality: 10,
    });

    frames.forEach((frame) => {
      gif.addFrame(frame, { delay: 100 });
    });

    gif.on('finished', (blob) => {
      const url = URL.createObjectURL(blob);
      setGif(url);
    });

    gif.render();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Video to GIF Converter</h2>
      <div className="form-group">
        <label htmlFor="videoUpload" className="form-label d-block mb-2">
          Upload Video
        </label>
        <input
          type="file"
          className="form-control-file"
          id="videoUpload"
          accept="video/*"
          onChange={handleVideoUpload}
          style={{
            border: '2px solid #ced4da',
            borderRadius: '.25rem',
            padding: '.5rem',
          }}
        />
      </div>
      {video && (
        <div className="mt-4 text-center">
          <h4>Original Video</h4>
          <video
            src={video}
            controls
            style={{
              maxWidth: '100%',
              height: 'auto',
              border: '1px solid #ced4da',
            }}
          ></video>
          <div className="mt-4">
            <button className="btn btn-primary" onClick={convertToGIF}>
              Convert to GIF
            </button>
          </div>
        </div>
      )}
      {gif && (
        <div className="text-center mt-4">
          <h4>Converted GIF</h4>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <img
            src={gif}
            alt="Converted GIF"
            style={{
              maxWidth: '100%',
              height: 'auto',
              border: '1px solid #ced4da',
            }}
          />
          <div className="mt-2">
            <a href={gif} download="converted-video.gif" className="btn btn-success">
              Download GIF
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoToGIFComponent;
