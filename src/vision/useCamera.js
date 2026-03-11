import { useState, useRef, useCallback } from "react";

export const useCamera = () => {
  const videoRef      = useRef(null);
  const canvasRef     = useRef(null);
  const streamRef     = useRef(null);

  const [active,    setActive]    = useState(false);
  const [captured,  setCaptured]  = useState(null); // base64 image
  const [error,     setError]     = useState(null);
  const [facingMode,setFacingMode]= useState("environment"); // back camera

  // Start camera
  const startCamera = useCallback(async () => {
    setError(null);
    setCaptured(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setActive(true);
    } catch (err) {
      setError("Camera access denied. Please allow camera permission.");
      setActive(false);
    }
  }, [facingMode]);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setActive(false);
  }, []);

  // Capture frame as base64
  const capture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return null;
    const video  = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width  = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);
    const base64 = canvas.toDataURL("image/jpeg", 0.85).split(",")[1];
    setCaptured(base64);
    stopCamera();
    return base64;
  }, [stopCamera]);

  // Flip camera front/back
  const flipCamera = useCallback(() => {
    stopCamera();
    setFacingMode((f) => (f === "environment" ? "user" : "environment"));
  }, [stopCamera]);

  // Retake — clear captured and reopen
  const retake = useCallback(() => {
    setCaptured(null);
    startCamera();
  }, [startCamera]);

  return {
    videoRef, canvasRef,
    active, captured, error, facingMode,
    startCamera, stopCamera, capture, flipCamera, retake,
  };
};