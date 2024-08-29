// src/components/ImageCompressor.js
import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import 'bootstrap/dist/css/bootstrap.min.css';

const ImageCompressorComponent = () => {
  const [compressedImage, setCompressedImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [originalSize, setOriginalSize] = useState(null);
  const [compressedSize, setCompressedSize] = useState(null);
  const [reductionPercentage, setReductionPercentage] = useState(null);
  const [error, setError] = useState('');

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const fileSize = file.size / 1024; // Size in KB
      setOriginalSize(fileSize.toFixed(2));

      const options = {
        maxSizeMB: 1, // Maximum size in MB
        maxWidthOrHeight: 1024, // Maximum width or height
        useWebWorker: true, // Use web worker for compression
      };

      const compressedFile = await imageCompression(file, options);
      const compressedFileSize = compressedFile.size / 1024; // Size in KB

      setCompressedSize(compressedFileSize.toFixed(2));
      setOriginalImage(URL.createObjectURL(file));
      setCompressedImage(URL.createObjectURL(compressedFile));
      
      const reduction = ((1 - compressedFileSize / fileSize) * 100).toFixed(2);
      setReductionPercentage(reduction);
    } catch (err) {
      setError('Error compressing image');
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Image Compressor</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="form-control mb-4"
      />
      {error && <div className="alert alert-danger">{error}</div>}
      {originalImage && (
        <div className="mb-4">
          <h3>Original Image:</h3>
          <img
            src={originalImage}
            alt="Original"
            className="img-fluid"
            style={{ maxWidth: '100%' }}
          />
          <p>Size: {originalSize} KB</p>
        </div>
      )}
      {compressedImage && (
        <div>
          <h3>Compressed Image:</h3>
          <img
            src={compressedImage}
            alt="Compressed"
            className="img-fluid"
            style={{ maxWidth: '100%' }}
          />
          <p>Size: {compressedSize} KB</p>
          {reductionPercentage && (
            <p>Your images are now {reductionPercentage}% smaller!</p>
          )}
          <a
            href={compressedImage}
            download="compressed-image.jpg" // You can specify a default filename here
            className="btn btn-primary mt-3"
          >
            Download Compressed Image
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageCompressorComponent;
