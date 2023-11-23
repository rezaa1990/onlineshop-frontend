import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUploade = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    const selectedImage = acceptedFiles[0];
    setUploadedImage(selectedImage);
  };

  const saveImageToSystem = () => {
    if (uploadedImage) {
      // ساخت یک شیء URL برای تصویر
      const imageUrl = URL.createObjectURL(uploadedImage);

      // ساخت یک لینک مستقیم به تصویر
      const downloadLink = document.createElement('a');
      downloadLink.href = imageUrl;
      downloadLink.download = '/media/reza/3210CC3510CC0239/linux files/bootstrap-shop/bootstrap-shop/src/images/panel-img';
      downloadLink.click();

      // آزاد کردن منابع
      URL.revokeObjectURL(imageUrl);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>تصویر را اینجا رها کنید...</p>
        ) : (
          <p>تصویر را انتخاب کنید یا در اینجا بکشید و رها کنید.</p>
        )}
      </div>
      {uploadedImage && (
        <div>
          <p>تصویر آپلود شده:</p>
          <img
            src={URL.createObjectURL(uploadedImage)}
            alt="آپلود شده"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <button onClick={saveImageToSystem}>ذخیره در سیستم</button>
        </div>
      )}
    </div>
  );
};

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default ImageUploade;
