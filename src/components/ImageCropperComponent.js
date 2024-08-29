import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ImageCropperComponent = () => {
  const [image, setImage] = useState(null);
  const [cropData, setCropData] = useState({
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });
  const [croppedImage, setCroppedImage] = useState(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
          setCropData({
            width: img.width > 100 ? 100 : img.width,
            height: img.height > 100 ? 100 : img.height,
            x: 0,
            y: 0,
          });
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropChange = (e) => {
    const { name, value } = e.target;
    setCropData((prevData) => ({
      ...prevData,
      [name]: parseInt(value, 10),
    }));
  };

  const cropImage = () => {
    const { width, height, x, y } = cropData;
    const canvas = canvasRef.current;

    // Ensure the canvas element is available
    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext('2d');
      if (image) {
        canvas.width = width;
        canvas.height = height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, x, y, width, height, 0, 0, width, height);
        setCroppedImage(canvas.toDataURL());
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Image Cropper</h2>
      <div className="form-group">
        <label htmlFor="imageUpload" className="form-label d-block mb-2">
          Upload Image
        </label>
        <input
          type="file"
          className="form-control-file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageUpload}
          style={{
            border: '2px solid #ced4da',
            borderRadius: '.25rem',
            padding: '.5rem',
          }}
        />
      </div>
      {image && (
        <div className="mt-4">
          <h4 className="text-center">Original Image</h4>
          <div className="text-center">
            <img
              ref={imageRef}
              src={image.src}
              alt="Original"
              style={{
                maxWidth: '100%',
                height: 'auto',
                border: '1px solid #ced4da',
                cursor: 'crosshair', // Cropping cursor style
              }}
            />
          </div>

          <div className="row mt-4 mb-3">
            <div className="col-md-6">
              <label htmlFor="cropWidth">Width (px):</label>
              <input
                type="number"
                className="form-control"
                id="cropWidth"
                name="width"
                value={cropData.width}
                onChange={handleCropChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="cropHeight">Height (px):</label>
              <input
                type="number"
                className="form-control"
                id="cropHeight"
                name="height"
                value={cropData.height}
                onChange={handleCropChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="cropX">Position X (px):</label>
              <input
                type="number"
                className="form-control"
                id="cropX"
                name="x"
                value={cropData.x}
                onChange={handleCropChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="cropY">Position Y (px):</label>
              <input
                type="number"
                className="form-control"
                id="cropY"
                name="y"
                value={cropData.y}
                onChange={handleCropChange}
              />
            </div>
          </div>
          <div className="text-center mb-4">
            <button className="btn btn-primary" onClick={cropImage}>
              Crop Image
            </button>
          </div>

          {croppedImage && (
            <div className="text-center">
              <h4>Cropped Image</h4>
              <canvas ref={canvasRef} style={{ border: '1px solid #ced4da' }} />
              <div className="mt-2">
                <a
                  href={croppedImage}
                  download="cropped-image.png"
                  className="btn btn-success"
                >
                  Download Cropped Image
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageCropperComponent;
