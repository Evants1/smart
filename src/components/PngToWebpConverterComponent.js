import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PngToWebpConverterComponent = () => {
  const [convertedImage, setConvertedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'image/png') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          const webpData = canvas.toDataURL('image/webp');
          setConvertedImage(webpData);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">PNG to WebP Converter</h2>
      <div className="form-group">
        <label htmlFor="imageUpload" className="form-label d-block mb-2">
          Upload PNG Image
        </label>
        <input
          type="file"
          className="form-control-file"
          id="imageUpload"
          accept="image/png"
          onChange={handleImageUpload}
          style={{
            border: '2px solid #ced4da',
            borderRadius: '.25rem',
            padding: '.5rem',
          }}
        />
        <small className="form-text text-muted">
          Please upload a PNG image file.
        </small>
      </div>
      {convertedImage && (
        <div className="mt-4 text-center">
          <h4>Converted WebP Image</h4>
          <img
            src={convertedImage}
            alt="Converted WebP"
            className="img-fluid border border-secondary rounded"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <div className="mt-2">
            <a
              href={convertedImage}
              download="converted-image.webp"
              className="btn btn-primary"
            >
              Download WebP
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default PngToWebpConverterComponent;
