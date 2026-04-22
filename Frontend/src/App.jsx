import { useEffect, useState } from "react";
import axios from "axios";
import Home from "../Pages/Home";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";

function App() {
  const [data, setData] = useState(null);

  // Fetch sensor data every 2 sec
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://localhost:3000/api/sensors")
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Voice alert
  const speak = (msg) => {
    const speech = new SpeechSynthesisUtterance(msg);
    window.speechSynthesis.speak(speech);
  };

  useEffect(() => {
    if (!data) return;

    if (data.obstacle && data.distance < 1) {
      speak("Obstacle very close");
    }

    if (data.water) {
      speak("Water detected nearby");
    }
  }, [data]);

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl">Loading SmartSight...</h2>
      </div>
    );

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
