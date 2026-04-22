import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5F5] via-[#FFFFFF] to-[#E8E8E8] text-black py-6">
      <section className="max-w-6xl mx-auto px-6   text-center">
        <h1 className="text-6xl font-bold leading-tight">
          <span className="text-red-600 underline">SmartSight</span>
          <br />
          Empowering Visions, Enhancing Independence
        </h1>

        <p className="mt-6 text-xl text-gray-700 max-w-2xl mx-auto">
          The world’s smartest wearable assistant designed for visually impaired
          individuals — combining obstacle detection, water alerts, GPS,
          currency identification, and AI support in one sleek device.
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-3 bg-red-600 text-white text-lg rounded-xl hover:bg-red-700 transition"
          >
            Start Live Demo
          </button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-bold text-center mb-14">Core Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-8 shadow-lg rounded-2xl bg-white hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-3">Obstacle Detection</h3>
            <p className="text-gray-600">
              Real-time ultrasonic + IR detection ensures safe movement indoors
              & outdoors.
            </p>
          </div>

          <div className="p-8 shadow-lg rounded-2xl bg-white hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-3">Water Detection</h3>
            <p className="text-gray-600">
              Alerts users instantly when water or slippery surfaces are
              detected.
            </p>
          </div>

          <div className="p-8 shadow-lg rounded-2xl bg-white hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-3">GPS </h3>
            <p className="text-gray-600">
              Track location, device status, and navigation through our
              SmartSight app.
            </p>
          </div>

          <div className="p-8 shadow-lg rounded-2xl bg-white hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-3">Currency Identification</h3>
            <p className="text-gray-600">
              Instantly identifies currency notes with built-in camera + AI.
            </p>
          </div>

          <div className="p-8 shadow-lg rounded-2xl bg-white hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-3">Voice Assistant</h3>
            <p className="text-gray-600">
              Hands-free interaction with voice commands for all features.
            </p>
          </div>

          <div className="p-8 shadow-lg rounded-2xl bg-white hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-3">Solar-Powered</h3>
            <p className="text-gray-600">
              SmartSight charges through sunlight + USB for all-day performance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
