import { useEffect, useRef, useState } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

const CameraDetection = () => {
  const videoRef = useRef(null);
  const animationRef = useRef(null);
  const lastSpokenRef = useRef("");
  const lastSpokenTimeRef = useRef(0);

  const [model, setModel] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [obstacle, setObstacle] = useState(false);
  const [waterDetected, setWaterDetected] = useState(false);
  const [currentObject, setCurrentObject] = useState("");

  // 🔹 Load model
  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  // 🔊 Voice function
  const speak = (text) => {
    const now = Date.now();

    if (
      text === lastSpokenRef.current &&
      now - lastSpokenTimeRef.current < 2000
    ) {
      return;
    }

    lastSpokenRef.current = text;
    lastSpokenTimeRef.current = now;

    window.speechSynthesis.cancel(); // 🔥 prevent overlap

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  };

  // 🔹 Stop camera
  const stopCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject;

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      videoRef.current.srcObject = null;
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    window.speechSynthesis.cancel();
  };

  // 🔹 Start / Stop camera
  useEffect(() => {
    if (!cameraOn) {
      stopCamera();
      return;
    }

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (!cameraOn) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    startCamera();
  }, [cameraOn]);

  // 🔹 Detection loop
  useEffect(() => {
    if (!model || !cameraOn) return;

    const detect = async () => {
      if (!videoRef.current) return;

      if (videoRef.current.readyState !== 4) {
        animationRef.current = requestAnimationFrame(detect);
        return;
      }

      const predictions = await model.detect(videoRef.current);

      let isClose = false;
      let water = false;

      let closestObject = null;
      let maxWidth = 0;

      predictions.forEach((pred) => {
        const width = pred.bbox[2];

        if (width > maxWidth) {
          maxWidth = width;
          closestObject = pred.class;
        }

        // 🚧 obstacle
        if (width > 500) {
          isClose = true;
        }

        // 💧 water approximation
        if (
          pred.class === "bottle" ||
          pred.class === "cup" ||
          pred.class === "wine glass"
        ) {
          water = true;
        }
      });

      setObstacle(isClose);
      setWaterDetected(water);
      setCurrentObject(closestObject || "");

      animationRef.current = requestAnimationFrame(detect);
    };

    detect();

    return () => cancelAnimationFrame(animationRef.current);
  }, [model, cameraOn]);

  // 🔊 Voice logic (priority-based)
  useEffect(() => {
    if (!cameraOn) return;

    if (obstacle) {
      speak(`${currentObject || "Obstacle"} ahead`);
      return;
    }

    if (waterDetected) {
      speak("Water risk detected");
      return;
    }

    if (!currentObject) return;

    let message = "";

    if (currentObject === "person") {
      message = "Person ahead";
    } else if (currentObject === "cell phone") {
      message = "Phone ahead";
    } else if (currentObject === "book") {
      message = "Book ahead";
    } else {
      message = `${currentObject} ahead`;
    }

    speak(message);
  }, [currentObject, obstacle, waterDetected, cameraOn]);

  // 🔹 Cleanup
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      {/* 🔘 Toggle */}
      <button
        onClick={() => setCameraOn(!cameraOn)}
        className={`mb-4 px-6 py-2 rounded ${
          cameraOn ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {cameraOn ? "Stop Camera" : "Start Camera"}
      </button>

      {/* 🎥 Video */}
      {cameraOn && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-[600px] rounded-lg border border-gray-700"
        />
      )}

      {/* 📊 Status */}
      {cameraOn && (
        <div className="mt-3 text-gray-400">
          {currentObject ? `Detected: ${currentObject}` : "Scanning..."}
        </div>
      )}

      {/* 🚨 Alerts */}
      {obstacle && cameraOn ? (
        <div className="fixed inset-0 bg-red-600 flex items-center justify-center z-50">
          <h1 className="text-5xl font-bold text-white animate-pulse">
            🚧 {currentObject ? `${currentObject} ahead` : "Obstacle Ahead"}
          </h1>
        </div>
      ) : waterDetected && cameraOn ? (
        <div className="fixed inset-0 bg-blue-600 flex items-center justify-center z-50">
          <h1 className="text-5xl font-bold text-white animate-pulse">
            💧 Water Risk Detected
          </h1>
        </div>
      ) : null}
    </div>
  );
};

export default CameraDetection;
