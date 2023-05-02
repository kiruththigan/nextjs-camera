import React, { useRef, useState } from "react";

function PhotoCaptureComponent() {
  const videoRef = useRef();
  const [imageData, setImageData] = useState(null);

  const handleCapture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/png");
    setImageData(dataUrl);
  };

  const handleCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (error) {
      console.log("Error accessing camera:", error);
    }
  };

  return (
    <div>
      {imageData ? (
        <img src={imageData} alt="captured image" />
      ) : (
        <>
          <video ref={videoRef} />
          <button onClick={handleCapture}>Capture</button>
          <button onClick={handleCameraAccess}>Access camera</button>
        </>
      )}
    </div>
  );
}

export default PhotoCaptureComponent;
