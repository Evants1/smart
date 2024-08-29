import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AVIFToPNG = () => {
  const [image, setImage] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  const canvasRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'image/avif') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload an AVIF image.');
    }
  };

  const convertToPNG = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    setConvertedImage(canvas.toDataURL('image/png'));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">AVIF to PNG Converter</h2>
      <div className="form-group">
        <label htmlFor="imageUpload" className="form-label d-block mb-2">
          Upload AVIF Image
        </label>
        <input
          type="file"
          className="form-control-file"
          id="imageUpload"
          accept="image/avif"
          onChange={handleImageUpload}
          style={{
            border: '2px solid #ced4da',
            borderRadius: '.25rem',
            padding: '.5rem',
          }}
        />
      </div>
      {image && (
        <div className="mt-4 text-center">
          <h4>Original Image</h4>
          <img
            src={image.src}
            alt="AVIF Preview"
            style={{
              maxWidth: '100%',
              height: 'auto',
              border: '1px solid #ced4da',
            }}
          />
          <div className="mt-4">
            <button className="btn btn-primary" onClick={convertToPNG}>
              Convert to PNG
            </button>
          </div>
        </div>
      )}
      {convertedImage && (
        <div className="text-center mt-4">
          <h4>Converted PNG Image</h4>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <img
            src={convertedImage}
            alt="Converted PNG"
            style={{
              maxWidth: '100%',
              height: 'auto',
              border: '1px solid #ced4da',
            }}
          />
          <div className="mt-2">
            <a
              href={convertedImage}
              download="converted-image.png"
              className="btn btn-success"
            >
              Download PNG Image
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AVIFToPNG;
